#!/bin/bash

# $@ means "all arguments"

echo $(pwd)

docker run -t                   \
  -v "$(pwd)/example/input:/input" \
  -v "$(pwd)/example/website:/output" \
  -v "$(pwd)/example/config:/config" \
  -u $(id -u):$(id -g)          \
  ghcr.io/thumbsup/thumbsup      \
  thumbsup --input /input --output /output --config /config/config.json $@
