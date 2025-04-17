const dotenv = require("dotenv");

dotenv.config();

module.exports = function () {
  const host = process.env.SQL_SERVER_NAME;
  const port = process.env.SQL_SERVER_PORT;
  const instance = process.env.SQL_SERVER_INSTANCE;
  const databaseName = process.env.SQL_DATABASE_NAME;
  const username = process.env.SQL_USER_NAME;
  const password = process.env.SQL_PASSWORD;
  // Connections to the local machine should not be encrypted, so we
  // don't have to set up SSL certs
  const encrypt = host === "localhost" ? "false" : "true";
  // On Windows, SQL Server might have an instance name instead of a port.
  const origin = instance
    ? `${host}\\${instance}`
    : port
      ? `${host}:${port}`
      : host; // default instance and port

  return {
    flywayArgs: {
      url: `jdbc:sqlserver://${origin};databaseName=${databaseName};encrypt=${encrypt}`,
      locations: `filesystem:${__dirname}/migration`,
      user: username,
      password: password,
      sqlMigrationSuffixes: ".sql",
      baselineOnMigrate: true,
      baselineVersion: "0002", // Do not change this baseline version number
      baselineDescription: "setup_db_baseline_data_as_of_07012020",
      reportEnabled: process.env.TEST_ENV ? false : true
    }
  };
};

// For other config options: https://flywaydb.org/documentation/commandline/migrate
