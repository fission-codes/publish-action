#!/usr/bin/env bash
set -eo pipefail

KEYFILE=$(mktemp -d)/machine_id.ed25519

# Ensure we're in workspace dir
cd $GITHUB_WORKSPACE

# Add the key from the environment variable
# *NOTE* The key must be base64 encoded (so we decode here)
echo $INPUT_MACHINE_KEY | base64 --decode >$KEYFILE

# Use defined remote
remote=""
if [ ! -z "$INPUT_REMOTE" ]; then
	remote="-R $INPUT_REMOTE"
fi

# Make sure that the fission install is set up properly
/usr/local/bin/fission setup --with-key $KEYFILE $remote

# Remove key file
rm $KEYFILE

# Set the working directory (if defined).
if [ ! -z "$INPUT_WORKDIR" ]; then
	cd $INPUT_WORKDIR
fi

# Publish the app
/usr/local/bin/fission app publish $remote
