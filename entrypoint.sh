#!/usr/bin/env bash
set -eo pipefail

# Ensure we're in workspace dir
cd $GITHUB_WORKSPACE

# Use defined remote
remote=""
if [ ! -z "$INPUT_REMOTE" ]; then
	remote="-R $INPUT_REMOTE"
fi

# Run verbose mode
verbose=""
if [ ! -z "$INPUT_VERBOSE" ]; then
	verbose="-v"
	echo "SETTING $verbose VERBOSE === "
fi

# Add the key from the environment variable
# *NOTE* The key must be base64 encoded (so we decode here)
KEYFILE=$(mktemp -d)/machine_id.ed25519
echo $INPUT_MACHINE_KEY | base64 --decode >$KEYFILE

# Make sure that the fission install is set up properly
/usr/local/bin/fission setup --with-key $KEYFILE $remote $verbose

# Remove key file
rm $KEYFILE

# Set the working directory (if defined).
if [ ! -z "$INPUT_WORKDIR" ]; then
	cd $INPUT_WORKDIR
fi

if [ ! -f "fission.yaml" ]; then
	if [ ! -z "$INPUT_APP_URL" ]; then
		echo -e "url: $INPUT_APP_URL\nbuild: $INPUT_BUILD_DIR" > fission.yaml
	else
		# App is already registered, so 
		/usr/local/bin/fission app register -b $INPUT_BUILD_DIR $remote $verbose
	fi
fi

# Publish the app
/usr/local/bin/fission app publish $remote $verbose

# Set the app url output 
app_url=$(awk '/^url:/ { print $2 }' fission.yaml)
echo "::set-output name=app_url::$app_url"