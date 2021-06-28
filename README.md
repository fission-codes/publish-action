![](https://raw.githubusercontent.com/fission-suite/kit/6a20e9af963dd000903b1c6e64f9fbb2102ba472/images/badge-solid-colored.svg)

# Publish Action

[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)
[![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)

This action publishes your app on Fission. 

*Note* You need to have an account already registered. See the [Getting Started](https://guide.fission.codes/developers/getting-started) section of the Fission Guide.

# QuickStart

``` yaml
- uses: fission-suite/publish-action@v1
  with:
      machine_key: ${{ secrets.FISSION_KEY }}
```

## Inputs 

### `machine_key` (`fission_key`)

**Required** The base64 encoded "machine key" for the app owner.

Once your user and app are registered, you can use the following command to get your key (base64 encoded):

`cat ~/.config/fission/key/machine_id.ed25519|base64`

Copy the resulting value into Github Secrets for your project (or run `gh secret set` if using the GitHub CLI). This is the `FISSION_KEY` for the action.

### `app_url`

*Optional* The URL of an already registered app. You can use this option instead of committing your `fission.yaml` file to git. This is especially useful if you want to deploy different branches to different URLs. 

### `build_dir`

*Optional* The build output directory for your app. This is the same value as the `build` valid in `fission.yaml`.

### `workdir`

*Optional* Set the working directory for publish. This is only required if your fission.yaml file is not in the root directory for the repository.

### `remote`

*Optional* Set the remote (Fission API endpoint) to use (leave this blank unless you know you need it.).

## Outputs 

### `app_url`

The url of the published app - particularly useful if your repository doesn't have a fission.yaml file and you are using generated urls. 
