# Fav-server

An API for updating the favourite media in a [thumbsup](https://thumbsup.github.io/) website.

## Requirements

- [thumbsup](https://thumbsup.github.io/)
- The `theme-cards-fav` theme
- A machine capable of running Docker (e.g. your computer, a Synology NAS, etc)

## How it works

Fav-server is a simple NodeJS Express application that does one-thing: it creates/updates `picasa.ini` files
with the favourite-state of images that you toggle the favourite-state for (via `theme-cards-fav`).

When the `picasa.ini` files change, the server initiates a rebuild of your site to persist the favourite-state.

[nodemon](https://github.com/remy/nodemon#nodemon) is used to keep the server alive forever, even when there are crashes (which shouldn't happen). 
Note that "alive forever" means "as long as the Docker container is running" when run inside of a Docker container.

## Installation

1. Run `docker build -t fav-server .` to build the docker image locally (TODO: this is temporary until we host this image somewhere)
2. Run `./run.sh` to start the server in Docker.

### Parameters

- `inputDir` (required): relative path to the input directory
- `rebuildCmd` (required): command to use to rebuild the website.
  - When inside Docker, this would look like `thumbsup --input /input --output /output --config /config/config.json`
  - Outside of Docker, the command could be `../thumbsgen.sh`.
  - The `--include <glob>` argument will be appended to this command **once thumbsup supports incremental build-hints**.
