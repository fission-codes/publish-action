FROM ubuntu:20.04

ENV CLI_VERSION 2.16.1
ENV CLI_NAME fission-cli-ubuntu-20.04
ENV LANG=C.UTF-8

RUN apt-get update \
    && apt-get install -y curl libpq5 libtinfo-dev netbase

RUN set -x \
    && curl -fSL "https://github.com/fission-suite/fission/releases/download/$CLI_VERSION/$CLI_NAME" -o $CLI_NAME \
    && chmod +x $CLI_NAME \
    && mv $CLI_NAME /usr/local/bin/fission

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
