# Project Package Organization

The TDM project consists of three packages: server, client and cypress, each with
their own folder under the root folder. Each of these folders has its own `package.json`
file, so each package is configured independently as far as its npm dependencies
and version number. This eliminates unintended interaction among the packages. Note
that the `package.json` file in the root folder should not contain run-time npm
dependencies of the packages, and a version number of "independent". In particular,
the root directory only has:

- The [husky](https://github.com/typicode/husky) package to implement a
  git-commit hook that runs the linter when a developer attempts to make a commit
  to the local repo and
- [Lerna](https://github.com/lerna/lerna) which allows you to run a command from the root directory, which, in turn gets run for each of the packages where such a command is defined.

The `lerna.json` file contains a `packages` property that determines which folders are to be treated as packages.

The driving motivation for this folder organization is to separate package-specific operations for each package, and extricate devops and git-realted operations to the root folder, and
cypress-related operations to the cypress folder.

## Root Folder Operations

You can run eslint on server and client packages with the single command

```
lerna run lint
```

from the root folder. This is what allows Husky to execute the linter on both projects in its pre-commit hook.

You can build a full-stack docker container with the command

```
docker build -t tdmcalc/tdmapp .
```

For further information on docker operations see [Deployment](/docs/deployment.md).

You can run all the existing package-level test scripts by running the command:

```
lerna run test:ci
```

where the package must have a script named `test:ci` to run, and we currently only have such a script for the client. (The name `test:ci` is just our convention for scripts a unit test script that runs
non-interactively, as you woudl need for a Continuous Integration scenario, which is what running via lerna is simulating.)

## Package Folder Operations

Most other command-line operations are performed from a terminal window opened to the package's folder.

### Running the application in debug mode

For example, running

```
npm start
```

in the server folder will start the server application on your local machine and control that terminal window until the server is stopped.
Likewise, the client folder is configures such that running the same `npm start` command in a terminal window will compile and run the client in a separate process and occupy that terminal window until the client app is terminated.

### Running Cypress Tests

If both client and server are running, opening a third terminal window on the cypress folder, and running the command

```
npm run cypress:run
```

will run the cypress tests in non-interactive mode,
showing results in the cypress terminal window. Or you can run

```
npm run cypress:open
```

to run cypress tests in interactive mode.

### Installing New NPM Packages

To make each package easy to maintain, we do not attempt to share dependencies among different packages in the repo. Consequently, when you find that the client, for example, needs a new or updated NPM package, PLEASE run the corresponding `npm install` or `npm update` command from the package's folder only (not the root folder)
