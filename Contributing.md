# Contributing to the TDM Calculator Project

If you are not going to do hands-on development, you can simply experiment
with the test version of the application at <a href="https://tdm-calc.herokuapp.com"> https://tdm-calc.herokuapp.com</a>.

If you wish to study or contribute to the code base, follow these Installation
Instructions to install a development environment on your machine:

## Installation Instructions

### Prerequisites

1. Git for working with Github source code
2. Node and npm for running the web app

### Full-Stack React/Node Application Installation

1. Clone this repo to your local drive.

   <details><summary>details</summary><p>

1. Start a terminal app, such as a Git bash shell on Windows or Terminal on Mac OS
1. Create a src directory in the user's home directory and go in it (or use the folder where you normally put local git repositories)
   ```
   cd && mkdir src && cd src
   ```
1. Clone the repository
   `git clone https://github.com/hackforla/tdm-calculator`

     </p></details>

1. Change to the tdm-calculator directory:
   ```
   cd tdm-calculator
   ```
1. Install the node server npm depedencies:
   ```
   npm install
   ```
1. Obtain the `.env` file from the tdm-calculator slack channel and place it in this directory. It contains private info (i.e., the production database connection string) that we cannot put in this public GitHub repo.
1. Change to the client directory:
   ```
   cd client
   ```
1. Install the client (React) dependencies:
   ```
   npm install
   ```

### To Run the React/Node Application

1. In one command line window, run `npm start` from the tdm-calculator directory to start the node server.
1. In a separate command line window, run `npm start` from the tdm-calculator/client directory to start the react app and open the browser.

## To Contribute Code

### Claiming an Issue

Before modifying any code, an issue should exist for the task in the GitHub repo. You should make sure that no one else is assigned to the issue and the assign it to yourself, so we avoid stepping on each others' toes. If there is not an issue for the work you want to do, you should talk to the lead developer and/or project manager to get an issue created and prioritized on the kanban board and then have them create the issue from there for you to work on.

### Working with forks and branches

- Explain your guidelines here.

### Working with pull requests and reviews

- Explain your process.

### Testing

We have three levels of testing built into the application at this time for just a few components/modules. Ideally, every React component should have a Storybook story and snapshot test, and critical non-react components should have good unit test coverage,as described below.

#### Storybook

[Storybook](https://storybook.js.org/) creates a "visual style guide" of components. Ideally, every visual React component will have a storybook story that allows us to view what each component looks like without having to track down some sort of screen where it might be used. See [this tutorial](https://www.learnstorybook.com/react/en/get-started) to get started with storybook. You can run the storybook preview page by running

`npm run storybook`

from the command line in the /client directory to view the storybook catalog for our project. Though this gives a human-visible look at a component, it does not really comprise an automated test of the component, so...

#### Snapshot Testing React Components

Snapshot testing uses the storybook [Storyshots addon](https://github.com/storybookjs/storybook/tree/master/addons/storyshots). A snapshot test is automatically generated for each story in storybook. when you run

`npm test`

from the command line, each story will be run to generate a rendered snippet of HTML. The first time each snapshot is run, the generated HTML will be recorded by storyshot in the /client/src/\_\_snapshots\_\_ directory for subsequent test runs. If on a subsequent test run, the new snapshot differs at all from the previous snapshot, the snapshot test will be considered "failed", and you should review it to see if the difference is intentional or not. If it is intentional, you can type "u" in the console to update the snapshot(s), and the new snapshot will be considered the "expected" output of the component for subsequent snapshot tests.

#### Unit Tests

[Jest](https://jestjs.io/) is used for unit testing of non-react ES6 modules, such as the tdm-engine. These also get run when you type

`npm test`

at the command line, and all should pass. In fact, we should eventually implement a "gated check-in" policy in github that automatically runs the unit tests, and blocks the check-in if any unit test fails. See the Create React App documentation on testing with Jest [here](https://facebook.github.io/create-react-app/docs/running-tests) for further information on how this works.
