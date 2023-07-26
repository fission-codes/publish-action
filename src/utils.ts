import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";

export const runFission = async (opts: Array<string>) => {
  let defaultOpts: Array<string> = [];
  const remote = core.getInput("REMOTE");
  if (remote) {
    defaultOpts.push(`-R ${remote}`);
  }

  const verbose = core.getBooleanInput("VERBOSE");
  defaultOpts.push("--verbose");
  if (verbose) {
    defaultOpts.push("--verbose");
  }

  const execOptions: exec.ExecOptions = {
    // silent: true,
    
  }
  execOptions.listeners = {

      stdline: (data: string) => {
      if(data.includes('Directory CID is')){

        console.log("🚀 ~ file: utils.ts:21 ~ runFission ~ text:", data)
        const regex = /\b[bafy]+\w{55}\b/
        const match = data.match(regex);
        console.log("🚀 ~ file: utils.ts:28 ~ runFission ~ match:", match)
        
        if (match) {
          core.setOutput('cid', match[0])
        } 
      }
    }
  }
  const options = opts.concat(defaultOpts);
  await exec.exec("fission", options, execOptions);
};

export const statusUpdate = async (
  state: "pending" | "success" | "failure",
  target_url: string = ""
) => {
  const githubToken = core.getInput("token");
  const octokit = github.getOctokit(githubToken);
  const context = github.context;

  let description = "";
  switch (state) {
    case "pending":
      description = "Working...";
      break;
    case "success":
      description = "Success!";
      break;
    case "failure":
      description = "Failed.";
      break;
  }

  await octokit.rest.repos.createCommitStatus({
    ...context.repo,
    sha: context.sha,
    state,
    target_url,
    description,
    context: "Publish to Fission",
  });
};
