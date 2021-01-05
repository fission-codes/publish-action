#!/usr/bin/env bash
#set -eo pipefail

# Ensure we're in workspace dir
cd $GITHUB_WORKSPACE

# Make sure our key folder exists
mkdir -p $HOME/.config/fission/key

# Add the key from the environment variable
# *NOTE* The key must be base64 encoded (so we decode here)
echo $INPUT_MACHINE_KEY|base64 --decode > $HOME/.config/fission/key/machine_id.ed25519

# Make sure that the fission install is set up properly
/usr/local/bin/fission setup

# Publish the app
/usr/local/bin/fission app publish

echo "DONE!"
