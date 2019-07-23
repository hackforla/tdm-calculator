# Transportation Demand Management (TDM) Calculator

Web application for performing the Traffic Demand Management calculation for
the city of Los Angeles. You can play with the application in the test environment
deployed to <a href="https://tdm-calc.herokuapp.com"> https://tdm-calc.herokuapp.com</a>

## Prerequisites

1. Git for working with Github source code
2. Node and npm for running the web app

## Full-Stack React/Node Application Installation

1. Clone this repo to your local drive.

   <details><summary>details</summary><p>

1. Start a terminal app, such as a Git bash shell on Windows or Terminal on Mac OS
1. Create a src directory in the user's home directory and go in it
   ```
   cd && mkdir src && cd src
   ```
1. Clone the repository
   `git clone https://github.com/entrotech/tdm-calculator`

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

## To Run the React/Node Application

1. In one command line window, run `npm start` from the jobs-for-hope directory to start the node server.
1. In a separate command line window, run `npm start` from the jobs-for-hope/client directory to start the react app and open the browser.
