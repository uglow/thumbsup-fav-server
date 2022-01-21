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