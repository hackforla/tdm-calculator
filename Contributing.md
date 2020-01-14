# Contributing to the TDM Calculator Project

If you are not going to do hands-on development, you can simply experiment
with the test version of the application at <a href="https://tdm-calc-staging.herokuapp.com"> https://tdm-calc-staging.herokuapp.com</a>.

The version that LA DOT personnel are using is deployedd to <a href="https://tdm-calc.herokuapp.com"> https://tdm-calc.herokuapp.com</a>.

If you wish to study or contribute to the code base, follow these Installation
Instructions to install a development environment on your machine:

## Installation Instructions

### Prerequisites

1. Git for working with Github source code
2. Node and npm for running the web app

### Full-Stack React/Node Application Installation

1. Start a terminal app, such as a Git bash shell on Windows or Terminal on Mac OS
1. Create a source directory (e.g. hack-for-la) in the user's home directory and go in it (or use the folder where you normally put local git repositories)
   ```
   mkdir hackforla
   cd hackforla
   ```
1. Clone the TDM repository

   ```
   git clone https://github.com/hackforla/tdm-calculator
   ```

1. Change to the tdm-calculator directory:
   ```
   cd tdm-calculator
   ```
1. Install the node server npm depedencies:
   ```
   npm install
   ```
1. Obtain the `.env` file from the tdm-calculator/Developers G-Drive folder and place it in this directory. It contains private info (i.e., the production database connection string) that we cannot put in this public GitHub repo.
1. Change to the client directory:
   ```
   cd client
   ```
1. Install the client (React) dependencies:
   ```
   npm install
   ```

### To Run the React/Node Application

1. In one terminal window, navigate back to the /tdm-calculator directory and start the node server:

```
cd ..
npm start
```

1. In a separate terminal window, navigate to the /tdm-calculator/client directory, start the react app, and open the browser :

```
cd client
npm start
```

Note: Node server (backend) should start before the React server (frontend/client)

## To Contribute Code

### Claiming an Issue

Before modifying any code, an issue should exist for the task in the GitHub repo. You should make sure that no one else is assigned to the issue and then assign it to yourself, so we avoid stepping on each others' toes. If there is not an issue for the work you want to do, you should talk to the lead developer and/or project manager to get an issue created and prioritized on the kanban board and then have them create the issue from there for you to work on.

We use the "Git Flow" workflow to manage source code. See [Vincent Driessen's seminal article](https://nvie.com/posts/a-successful-git-branching-model/) for an overview, though a few of the detailed procedures below have additional steps. We have modified a few steps here, so your changes are merged into _develop_ on GitHub (rather than locally). This allows others to easily view your changes, and is a smaller departure from the previous workflow to learn.

1. After cloning the repository, create a feature branch with a name containing your name and a feature name, separated by dashes, for example.

```
git checkout -b nicholas-issue-100 develop
```

Note that your feature branch is based on the _develop_ branch, which is where feature changes will be integrated for eventual release to production.

2. Claim an issue (see instructions down below) and start coding.

3. Regularly add, commit, and push your code to your branch.

```
git add -A
git commit -m "Write your commit message here with overall description of your code changes"
git push origin HEAD
```

4. When an issue is completed and is ready for a pull request, first add and commit your latest changes as in Step 3 above, then make sure your code has the latest code from the _develop_ branch by pulling from the develop branch. This is to ensure merge conflicts are in your local envinronment, which is easier to clean up, than in GitHub:

```
git fetch
git merge origin/develop
```

5. Resolve any merge conflicts and _run the application_ (client and server) to be sure that the application builds correctly before proceeding. Then push your changes to your feature branch on the github repo:

```
git push origin HEAD
```

6. Go to the [GitHub repository for TDM-Calculator](https://github.com/hackforla/tdm-calculator). There are three options:

- Click on "Compare & pull request" button underneath the "commits branches releases environment contributors" box.
- Click on the "New Pull Request" button underneath the "commits branches releases environment contributors" box and underneath "Your recently pushed branches" section.
- Click on the "Pull Request" tab and press "New Pull Request"

7. In "Comparing Changes", switch the "compare" (right button) to your branch name. Make sure the "base" (left button) is on the _develop_ branch. Double check the changes you've made down below, and click "Create pull request". Make sure the description of your changes is reflected in the Pull Request, e.g.
   "Start to incorporate Storybook and LADOT theme (colors, logos and headers)".

8. Click on "Create Pull Request" and wait for someone to review to merge your changes!

9. Once your PR has been reviewed, accepted and merged to the develop branch, it will automatically be published to <a href="https://tdm-calc-staging.herokuapp.com"> https://tdm-calc-staging.herokuapp.com</a>. Please be sure to run the application here and make sure your changes are reflected in this deployed version of the develop branch.

## Creating a Release

Creating a release should only be done by the release manager!
Release branches are crated from teh _develop_ branch. Decide on a release number for the next release, using [semver](https://semver.org/) conventions. For example, if the current release is 1.0.0 and the changes in this release are minor, the new release number would be 1.0.1.

- Make sure your local machine has an up-to-date version of the _develop_ branch:

```
git fetch
git merge origin/develop
```

- Create a new release branch from _develop_ wtih the name release-<release#>:

```
git checkout -b release-1.0.1 develop
```

- Update the release number in the application. This typically entails updating the package.json file version properties, and perhaps other locations where the release number might appear (For now, I just added it to the About.js component, though we should probably put it in a site footer or some inconspicuous place, so it can be viewed from the UI.)

- Commit the version number change:

```
git add -A
git commit -m "Bumped version number to 1.0.1"
```

- Run the application (locally and/or in a deployment environment) and make any fixes necessary. These should be very minor changes - significant changes should be made by creating a feature release based on the _develop_ branch as described above. When the application is ready for release...
- Merge the release branch into _master_:

```
git checkout master
git merge --no-ff release-1.0.0
git tag -a v1.0.1 -m "Release version 1.0.1"
```

The release is now done and tagged for future reference.

- Merge the release branch into _develop_:

```
git checkout develop
git merge --no-ff release-1.0.1
```

- We are now done with this release and can delete the release branch:

```
git branch -d release-1.0.1
```

- Deploy the master branch to production. At present, Heroku is configured to detect the commit to _master_ and automatically deploy the application to production. You should navigate to <a href="https://tdm-calc-staging.herokuapp.com"> https://tdm-calc-staging.herokuapp.com</a> after giving Heroku time to deploy and verify that the application runs, and any visible release # has been incremented.

## Creating a HotFix

TBD

Resources from our very own Hack For LA member!
[Intro to Git CLI exercises](https://github.com/ndanielsen/intro-cli-git-github)
[Intermediate Git CLI exercises](https://github.com/ndanielsen/intermediate-cli-git-github)

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
