const appInsights = require("applicationinsights");
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("error-handler");
const routes = require("./app/routes");
const pino = require("express-pino-logger")();

dotenv.config();

// This configures node to send ApplicationInsights data to Azure
appInsights.start();

const port = process.env.PORT || 5000;

const app = express();
app.use(pino);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    // Most wweb servers will set the secure property of the
    // request, but Heroku sets x-forwarded-proto to http if
    // not secure
    if (req.header("x-forwarded-proto") !== "https")
      // redirect to https with same host & url
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// Set headers & end pre-flight requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// For use of GoDaddy SSL cert
app.use(express.static(".well-known"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Web API routes
app.use("/api", routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

// The "catchall" handler: for any request that doesn't
// match one above, send back to React's index.html file.
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Using custom error message if the request is 
// not passed through
app.use((error, req, res) => {
  console.error(req.url, error);
  res.status(500).send("Something went wrong on the server.");
});

// Handling error using NPM package
// meant only for development if stated otherwise
// with `console.error`
app.use(errorHandler);

// Running server on the defined `port`
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
