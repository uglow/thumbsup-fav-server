# [1.2.0](https://github.com/uglow/thumbsup-fav-server/compare/v1.1.0...v1.2.0) (2022-11-06)


### Features

* **ui:** add manifest file download ([a21d256](https://github.com/uglow/thumbsup-fav-server/commit/a21d2567dfa016a9a1e879419db10073951b7984))

# [1.1.0](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.6...v1.1.0) (2022-08-01)


### Features

* **qr:** add QR code to folder and slide ([5c91b4c](https://github.com/uglow/thumbsup-fav-server/commit/5c91b4ca0a7d1e9ff8013926d88afbf6d46d8659))

## [1.0.6](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.5...v1.0.6) (2022-01-21)


### Bug Fixes

* cleanup CI workflow now that it is working ([2053289](https://github.com/uglow/thumbsup-fav-server/commit/20532897d40f65131f91cff16409f2bcca5f6d59))

## [1.0.5](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.4...v1.0.5) (2022-01-21)


### Bug Fixes

* **ci:** use PAT for workflow to trigger next workflow ([c7bc907](https://github.com/uglow/thumbsup-fav-server/commit/c7bc9070e9eb19a0a93dbc2da3b752c01c9117ab))

## [1.0.4](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.3...v1.0.4) (2022-01-21)


### Bug Fixes

* **ci:** try to trigger publish docker workflow from semantic release ([70e9096](https://github.com/uglow/thumbsup-fav-server/commit/70e9096d95724ff071107cecc08b7506948479b2))

## [1.0.3](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.2...v1.0.3) (2022-01-20)


### Bug Fixes

* publish to docker only on release (via NPM, hopefully) ([11a714f](https://github.com/uglow/thumbsup-fav-server/commit/11a714f317edbfa5f1a01803f6b8b5935221999f))

## [1.0.2](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.1...v1.0.2) (2022-01-20)


### Bug Fixes

* add missing patch file ([9a37406](https://github.com/uglow/thumbsup-fav-server/commit/9a3740611162391353e45e9eb7b8351d950f5462))

## [1.0.1](https://github.com/uglow/thumbsup-fav-server/compare/v1.0.0...v1.0.1) (2022-01-20)


### Bug Fixes

* change Docker COPY command (works locally, but not on GitHub) ([e3f60db](https://github.com/uglow/thumbsup-fav-server/commit/e3f60dbfcca87ecfeb3847a560dd7216c9b91e01))

# 1.0.0 (2022-01-20)


### Bug Fixes

* make nodemon a dependency ([7256cf9](https://github.com/uglow/thumbsup-fav-server/commit/7256cf9e6bf52e170a0ce551c15d6ca8f06abea8))
* use spawn() instead of exec() to avoid buffering stdio calls (and killing the child process when the buffer is full!) ([a1e77d4](https://github.com/uglow/thumbsup-fav-server/commit/a1e77d401b63a3dcd6274fb2e3ccb318f3832d17))


### Features

* add support for MPG video files ([6d0f090](https://github.com/uglow/thumbsup-fav-server/commit/6d0f090c0b3b3ab515b5f3567165dd2167abec77))
* added rebuildDelay, reduce container size by removing npm dev-deps ([f5fc4ad](https://github.com/uglow/thumbsup-fav-server/commit/f5fc4adae56725cbcb2498768f0be55a209680cf))
