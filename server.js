const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("error-handler");
const routes = require("./app/routes");

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

// Set headers & end pre-flight requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
// match one above, send back React's index.html file.

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((error, req, res) => {
  console.error(req.url, error);
  res.status(500).send("Something went wrong on the server.");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
