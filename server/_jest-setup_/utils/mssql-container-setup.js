// const { GenericContainer, Wait } = require("testcontainers");
const { MSSQLServerContainer } = require("@testcontainers/mssqlserver");
const sql = require("mssql");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

require("dotenv").config();

const DB_PASSWORD = process.env.SQL_PASSWORD;
const MSSQL_PORT = 1433; // docker container port
const HOST_PORT = parseInt(process.env.SQL_SERVER_PORT, 10);

let container;
let connection;

const setupContainer = async () => {
  try {
    console.log("Starting the MS SQL Server container...");
    container = await new MSSQLServerContainer()
      .withWaitForMessage(/.*Attribute synchronization manager initialized*/)
      .acceptLicense()
      .withPassword(DB_PASSWORD)
      .withEnvironment({ MSSQL_PID: "Express" })
      .withExposedPorts({ container: MSSQL_PORT, host: HOST_PORT })
      .start();

    const sqlConfig = {
      user: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      server: container.getHost(),
      port: container.getPort(),
      pool: {
        max: 1,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        trustServerCertificate: true
      }
    };
    // console.log("sqlConfig: " + JSON.stringify(sqlConfig, null, 2));

    console.log("Connecting to the database server...");
    connection = await sql.connect(sqlConfig);

    console.log("Creating the test database...    ");
    await connection.query`CREATE DATABASE tdmtestdb`;

    console.log("Test database tdmtestdb created ");
    return container;
  } catch (error) {
    console.error("Error in setupContainer:", error);
    throw error;
  }
};

const runMigrations = async () => {
  try {
    console.log("Running migrations on test database...");
    const { stdout } = await exec("npm run flyway:migrate");
    console.log("Migrations completed on tdmtestdb");
    return stdout;
  } catch (error) {
    console.error(`Error running flyway:migrate: ${error}`);
    throw error;
  }
};

const backupDatabase = async () => {
  try {
    console.log("Backing up database...");
    await connection.query`BACKUP DATABASE tdmtestdb TO DISK = '/var/opt/mssql/backup/tdmtestdb.bak'`;
    console.log(
      "Test database backup completed - for use on each test suite..."
    );
  } catch (error) {
    console.error("Error backing up database:", error);
    throw error;
  }
};

// used in global setup
const start = async () => {
  try {
    container = await setupContainer();
    await runMigrations();
    await backupDatabase();
    console.log("Starting test suites now. Please wait...");
  } catch (error) {
    console.error("Error in start:", error);
    throw error;
  }
};

// used in global teardown
const stop = async () => {
  try {
    if (connection) {
      console.log("Closing test db connection...");
      connection.close();
    }
    if (container) {
      console.log("Stopping test container...");
      await container.stop();
    }
  } catch (error) {
    console.error("Error in stop:", error);
    throw error;
  }
};

module.exports = {
  start,
  stop
};
