const dotenv = require("dotenv");

dotenv.config();

module.exports = function () {
  const isTestEnv = process.env.TEST_ENV === "true";

  const host = isTestEnv ? process.env.TEST_SQL_SERVER_NAME : process.env.SQL_SERVER_NAME;
  const port = isTestEnv ? process.env.TEST_SQL_SERVER_PORT : process.env.SQL_SERVER_PORT;
  const instance = isTestEnv ? process.env.TEST_SQL_SERVER_INSTANCE : process.env.SQL_SERVER_INSTANCE;
  const databaseName = isTestEnv ? process.env.TEST_SQL_DATABASE_NAME : process.env.SQL_DATABASE_NAME;
  const username = isTestEnv ? process.env.TEST_SQL_USER_NAME : process.env.SQL_USER_NAME;
  const password = isTestEnv ? process.env.TEST_SQL_PASSWORD : process.env.SQL_PASSWORD;
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
      baselineDescription: "setup_db_baseline_data_as_of_07012020"
    }
  };
};

// For other config options: https://flywaydb.org/documentation/commandline/migrate
