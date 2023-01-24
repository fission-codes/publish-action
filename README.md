<div align="center">
  <img src="https://github.com/fission-codes/kit/blob/main/images/logo-icon-coloured.png?raw=true" alt="Fission logo" width="100" />

  <h1>Publish Action</h1>

[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)
[![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)
</div>

This action publishes your app on Fission. 

*Note* You need to have an account already registered. See the [Getting Started](https://guide.fission.codes/developers/getting-started) section of the Fission Guide.

# QuickStart

``` yaml
- uses: fission-suite/publish-action@v1
  with:
      machine_key: ${{ secrets.FISSION_MACHINE_KEY }}
```

## Inputs 

### `machine_key`

**Required** The base64 encoded "machine key" for the app owner.

Once your user and app are registered, you can use the following command to get your key (base64 encoded):

`base64 ~/.config/fission/key/machine_id.ed25519`

Copy the resulting value into Github Secrets for your project (or run `gh secret set` if using the GitHub CLI).

*Note* Currently the machine key must come from a root account that was created using the Fission CLI.  See Troubleshooting below for more info.

### `app_url`

*Optional* The URL of an already registered app. You can use this option instead of committing your `fission.yaml` file to git. This is especially useful if you want to deploy different branches to different URLs. 

### `build_dir`

*Optional* The build output directory for your app. This is the same value as the `build` valid in `fission.yaml`.

### `workdir`

*Optional* Set the working directory for publish. This is only required if your fission.yaml file is not in the root directory for the repository.

### `remote`

*Optional* Set the remote (Fission API endpoint) to use (leave this blank unless you know you need it.).

### `verbose`

*Optional* Enables verbose output from the fission CLI (useful for debugging publishing errors).

## Outputs 

### `app_url`

The url of the published app - particularly useful if your repository doesn't have a fission.yaml file and you are using generated urls. 

## Troubleshooting

### Invalid key file provided

When you run your GitHub action, you receive the following error.

```
🚫 Invalid key file provided.
```

Currently the publish action will only work for machine keys associated with root accounts that were created using the Fission CLI, not a web browser.  If you are experiencing this issue, jump into the #support channel in [Discord](https://discord.gg/daDMAjE) and we'll get things squared away for you.
