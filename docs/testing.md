# Testing

We have three levels of testing built into the application at this time for just a few components/modules. Ideally, every React component should have a Storybook story and snapshot test, and critical non-react components should have good unit test coverage,as described below.

#### Storybook

[Storybook](https://storybook.js.org/) creates a "visual style guide" of components. Ideally, every visual React component will have a storybook story that allows us to view what each component looks like without having to track down some sort of screen where it might be used. See [this tutorial](https://www.learnstorybook.com/react/en/get-started) to get started with storybook. You can run the storybook preview page by running

`npm run storybook`

from the command line in the /client directory to view the storybook catalog for our project. Though this gives a human-visible look at a component, it does not really comprise an automated test of the component, so...

#### Unit Tests

[Jest](https://jestjs.io/) is used for unit testing of non-react ES6 modules, such as the tdm-engine. These also get run when you type

`npm test`

at the command line, and all should pass. In fact, we should eventually implement a "gated check-in" policy in github that automatically runs the unit tests, and blocks the check-in if any unit test fails. See the Create React App documentation on testing with Jest [here](https://facebook.github.io/create-react-app/docs/running-tests) for further information on how this works.

#### Cypress Integration Tests (aka Acceptance Tests aka End-to-End Tests aka Journey Tests)

[Cypress](https://www.cypress.io/) is a front end testing tool built for the modern web. Cypress can test anything that runs in a browser. Cypress enables you to write all types of tests End-to-end tests, Integration tests, Unit tests. We're currently using Cypress for integration tests.

To run the Cypress Tests from the root directory, you will need 3 terminal windows open for the server, client, and cypress servers:

- `npm start` or `yarn start` to start the backend node server
- `cd client` to change into the client directory from the root directory
- `npm start` or `yarn start` and start the frontend React server
- `cd cypress` to change into the cypress from the root directory
- `npm run cypress` or `yarn cypress` to start the Cypress Tests

After a moment, the [Cypress Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview) will launch.

- Click `Run all specs` to run the tests.

You can read the [Cypress Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview) docs to learn more about the tool and how to debug using the test runner.
