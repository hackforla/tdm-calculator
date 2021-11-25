# Testing

## Unit Tests

[Jest](https://jestjs.io/) is used for unit testing of non-react ES6 modules, such as the tdm-engine. These also get run when you type

`npm test`

at the command line, and all should pass. In fact, we should eventually implement a "gated check-in" policy in github that automatically runs the unit tests, and blocks the check-in if any unit test fails. See the Create React App documentation on testing with Jest [here](https://facebook.github.io/create-react-app/docs/running-tests) for further information on how this works.

## Cypress Integration Tests

###### AKA Acceptance Tests AKA End-to-End Tests AKA Journey Tests

[Cypress](https://www.cypress.io/) is a front end testing tool built for the modern web. Cypress can test anything that runs in a browser. Cypress enables you to write all types of tests End-to-end tests, Integration tests, Unit tests. We're currently using Cypress for integration tests.

By default, Cypress runs headlessly in the terminal. Alternatively, Cypress runs tests in the browser where you can visually see the tests interacting with the app's UI.

There are a few different ways to start up the Cypress tests depending on if the application servers (Node server and React Client) are already running or not.

### Running Cypress Tests

Open a terminal window, and change directories into in the cypress folder. Make sure the npm dependencies are installed with `npm install`.

##### Cypress in Browser

If the TDM app is not already up, run in the terminal:

```
npm run open
```

This will start up the Node server and client server concurrently, and after a moment, the [Cypress Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview) will launch in the browser.

If the app servers are already running elsewhere, you can run

```
npm run cypress:open
```

to only start up the cypress tests.

You can click on individual tests to run, or click on `Run XX integration specs` on the top right hand corner to run all the available tests.

You can read the [Cypress Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview) docs to learn more about the tool and how to debug using the test runner.

##### Cypress in Terminal

To run cypress tests headlessly in the terminal (i.e. non-interactively), you can either run

```bash
npm run test
```

to concurrently start up the application Node & React servers, and also run tests in the terminal;

or if the application servers are already up, you can just run

```
npm run cypress:run`
```

to only run tests in the terminal.
