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

The root directory also contains a few dev dependencies for developers who'd like to run both the backend node server and the React client server concurrently from the root directory. Also, these dependencies are useful when running [cypress integration tests](./testing.md#cypress-integration-tests) as part of the [push script](../../tdm-calculator/push.sh).

### Installing New NPM Packages

To make each package easy to maintain, we do not attempt to share dependencies among different packages in the repo. Consequently, when you find that the client, for example, needs a new or updated NPM package, PLEASE run the corresponding `npm install` or `npm update` command from the package's folder only.

## Root Folder Operations

You can run both the server and client concurrently with the single command

```
npm start
```

from the root folder. ([Alternatively, you can run the servers independently](./contributing.md#alternatively-you-can-run-the-servers-independently).)

You can run eslint on server and client packages with the single command

```
lerna run lint
```

from the root folder. This is what allows Husky to execute the linter on both projects in its pre-commit hook.

NOTE: If you get an error `bash: lerna: command not found` on Windows 10, you may need to add `%AppData%\npm` to your PATH Environment Variable and re-start your bash shell.

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
