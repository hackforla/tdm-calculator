const appInsights = require("applicationinsights");
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorHandler = require("error-handler");
const routes = require("./app/routes");
const pino = require("express-pino-logger")();

dotenv.config();

// This configures node to send ApplicationInsights data to Azure
if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();
} else {
  console.log(
    `No ApplicationInsights connection string found. 
Please add the APPLICATIONINSIGHTS_CONNECTION_STRING value to the environment variables.`
  );
}

const port = process.env.PORT || 5000;

const app = express();
app.use(pino);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    // Most web servers will set the secure property of the
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// For use of GoDaddy SSL cert
app.use(express.static(".well-known"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

// TODO: Is following line needed for something. Already added above with
// {extended: true} option.
app.use(express.urlencoded({ extended: false }));

// Web API routes
app.use("/api", routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.all("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((err, req, res) => {
  console.error(req.url, err);
  res.status(500);
  res.send(err);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;