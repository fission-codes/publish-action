![](https://raw.githubusercontent.com/fission-suite/kit/6a20e9af963dd000903b1c6e64f9fbb2102ba472/images/badge-solid-colored.svg)

# Publish Action

[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)
[![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)

This action publishes your app on Fission. 

*Note* You need to have an account and app already registered. See the [Getting Started](https://guide.fission.codes/developers/getting-started) section of the Fission Guide.

# QuickStart

``` yaml
- uses: fission-suite/publish-action@v1
  with:
      machine_key: ${{ secrets.FISSION_KEY }}
```

## Inputs 

### `machine_key`

**Required** The base64 encoded "machine key" for the app owner.

Once your user and app are registered, you can use the following command to get your key (base64 encoded):

`cat ~/.config/fission/key/machine_id.ed25519|base64`


