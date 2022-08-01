# Building and Testing this project

This document describes how to set up your development environment to build and test this project.
It also explains the basic mechanics of using `git` and `node`

- [Prerequisite Software](#prerequisite-software)
- [Project Organisation](#project-organisation)
- [Installing NPM Modules](#installing)
- [Running Tests](#running-tests)
- [Formatting your Source Code](#formatting-your-source-code)
- [Linting/verifying your Source Code](#lintingverifying-your-source-code)
- [Semantic Release setup](#semantic-release-setup)

See the [contribution guidelines][contributing] if you'd like to contribute to this project.

# Prerequisite Software

Before you can build and test this project, you must install and configure the
following products on your development machine:

- [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing Git](https://help.github.com/articles/set-up-git) is a good source of information.
- [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](package.json)) which is used to run tests.

# Installation

1. Git clone this repo.
2. `cd <repo>`
3. `npm install`
4. `npm run start:local` to start the thumbnail generator and the server.
5. Start a new static webserver in the `<repo>/example/website` folder.

## Using a static webserver

In order to view the changes (and change the favourite-state of a photo), you need to
run a basic webserver in the output directory that you are targeting. When
developing locally, that folder is `<repo>/example/website`

## OSX webserver

1. Open a terminal window.
2. `cd <repo>/example/website`.
3. `python -m SimpleHTTPServer 8000` to start a webserver
4. Open a new browser and goto `http://localhost:8000` to view the generated website.

# Project organisation

The project is organised into the following folder structure:

- `/` - Project-level configuration (linting rules, CI, docs, license)
- `.github/` - Github workflow
- `docs/` - Theme documentation (not used yet)
- `example/` - A complete example to demonstrate this software
- `patch/` - Patches that are applied to the Docker image
- `src/` - The source code and test specifications

# Developing changes

There are two stages of development:

1. Developing outside of Docker
2. Developing (testing) inside of Docker.

**For both approaches a static webserver pointed to `http://localhost:8000` is needed** to see the website (see above).
Also, the website needs to refreshed manually after changes are made to the code.


## Developing outside Docker

This is the best way to do iterative development for this package. Run
`npm start:local` to start the local Express server using [nodemon](https://github.com/remy/nodemon#nodemon).
As you make changes to the source code, the server will restart.

Note that when running **outside** of Docker, the patch files (see below) are not applied.


## Running everything within Docker

Once your changes are working well outside Docker, it's time to test them inside Docker.

1. `docker build -t fav-server .` to build the docker image locally.
2. `./run-local.sh` to start the server in Docker.

Testing the side **inside** Docker allows the patch files (see below) to be applied.

# Patch folder

There is often a delay between raising an issue and receiving the feature/fix. To avoid having to wait too long,
the files in the `/patch` folder provide a simple way to add missing features until such time as upstream packages are updated (and there is a chance they may never be updated).

Current patches:
- `patch/thumbsup/node_modules/thumbsup/src/components/index/glob.js`, a fix for [adding mpg support](https://github.com/thumbsup/thumbsup/issues/280).

# Running Tests (coming soon)

```shell
# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run tests and see the coverage report
npm run test:report
```

# Formatting your source code

This project uses [eslint](https://eslint.org) and [prettier](https://prettier.io/) to format the source code.
If the source code is not properly formatted, the CI will fail and the PR cannot be merged.

You can automatically format your code by running:

- `npm run lint`: format _all_ source code

A better way is to set up your IDE to format the changed file on each file save.

### WebStorm / IntelliJ

1. Open `Preferences > Languages & Frameworks > JavaScript > Prettier`
1. Find the field named "Prettier Package"
1. Add `<PATH_TO_YOUR_WORKSPACE>/<project-root>/node_modules/prettier`

# Linting/Verifying your Source Code

You can check that your code is properly formatted and adheres to coding style:

```shell
# Check that the code is formatted and following the coding style:
npm run verify

# Fix any auto-fixable errors
npm run lint
```

# Semantic Release Setup

This section is include for informational purposes only.

This repo uses [semantic-release][semantic-release] to manage software versions and packaging.
**There is a one-time setup-step required - WHICH HAS ALREADY BEEN DONE**, which creates a GitHub
personal access token, an NPM token, and connects them to Travis CI.

One time setup:
```shell script
cd <to repo folder>
npx semantic-release-cli setup

? What is your npm registry? https://registry.npmjs.org/
? What is your npm username? u_glow
? What is your npm password? [hidden]
? What is your NPM two-factor authentication code? [hidden - Authenticator app]
? Provide a GitHub Personal Access Token (create a token at https://github.com/settings/tokens/new?scopes=repo) 
? What CI are you using? GitHub Actions (or choose "Other" and the tokens are displayed for you manually add)

```

<hr>

[contributing]: CONTRIBUTING.md
[repo]: https://github.com/uglow/thumbsup-fav-server
[readme-usage]: README.md#usage
[semantic-release]: https://semantic-release.gitbook.io/semantic-release/
