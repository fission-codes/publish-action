FROM haskell:latest

ENV CLI_VERSION 2.9.1.0
ENV CLI_NAME fission-cli-linux-x86_64

RUN apt-get update \
    && apt-get install -y libpq5 libtinfo5 wget

RUN set -x \
    && wget -q "https://github.com/fission-suite/fission/releases/download/$CLI_VERSION/$CLI_NAME" \
    && chmod +x $CLI_NAME \
    && mv $CLI_NAME /usr/local/bin/fission

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
