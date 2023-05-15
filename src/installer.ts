import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'
import * as tc from '@actions/tool-cache'
import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import { runFission } from './utils'

const ASSET_NAME = 'fission-cli-ubuntu-20.04-x86_64'

export const getFissionCLI = async () => {
  const githubToken = core.getInput('token')
  const octokit = github.getOctokit(githubToken)

  // Grab the latest release from github
  const { data: release } = await octokit.rest.repos.getLatestRelease({
    owner: 'fission-suite',
    repo: 'fission',
  })

  core.info(`HELLO22 Using fission CLI version: ${release.tag_name}`)

  // Check the tool cache for the fission CLI.
  let toolPath: string
  toolPath = tc.find('fission-cli', release.tag_name)
  if (!toolPath) {
    // Get the URL for the actual CLI version
    let downloadPath = ''
    const asset = release.assets.find((a) => a.name == ASSET_NAME)
    if (asset) {
      downloadPath = await tc.downloadTool(asset.browser_download_url)
      await exec.exec('chmod', ['+x', downloadPath])
    } else {
      core.info('Unable to find release download.')
    }

    if (downloadPath) {
      toolPath = await tc.cacheFile(
        downloadPath,
        'fission',
        'fission-cli',
        release.tag_name
      )
    }
  }

  core.addPath(toolPath)
}

export const importKey = async (key: string) => {
  const tempDir = process.env['RUNNER_TEMP'] || ''
  assert.ok(tempDir, 'Expected RUNNER_TEMP to be defined')

  const keyFile = path.join(tempDir, 'machine_id.ed25519')

  let buff = Buffer.from(key, 'base64')
  fs.writeFileSync(keyFile, buff)

  await runFission(['setup', '--with-key', keyFile])
}
