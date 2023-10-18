const sql = require("mssql");

const dotenv = require("dotenv");
dotenv.config();

let config;

// checks which db type to connect to based on environment variables
if (process.env.TEST_ENV === "true") {
    config = {
        server: process.env.TEST_SQL_SERVER_NAME,
        user: process.env.TEST_SQL_USER_NAME,
        password: process.env.TEST_SQL_PASSWORD,
        database: process.env.TEST_SQL_DATABASE_NAME,
        port: process.env.TEST_SQL_SERVER_PORT
            ? parseInt(process.env.TEST_SQL_SERVER_PORT, 10)
            : 1433,
        options: {
            encrypt: false,
            enableArithAbort: true
        }
    };
} else {
    config = process.env.SQL_SERVER_INSTANCE
  ? {
      server: process.env.SQL_SERVER_NAME,
      user: process.env.SQL_USER_NAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE_NAME,
      options: {
        instanceName: process.env.SQL_SERVER_INSTANCE,
        encrypt: process.env.SQL_ENCRYPT == "false" ? false : true,
        enableArithAbort: true
      }
    }
  : {
      server: process.env.SQL_SERVER_NAME,
      user: process.env.SQL_USER_NAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE_NAME,
      port: process.env.SQL_SERVER_PORT
        ? parseInt(process.env.SQL_SERVER_PORT, 10)
        : 1433,
      options: {
        encrypt: process.env.SQL_ENCRYPT == "false" ? false : true,
        enableArithAbort: true
      }
    };

  if (process.env.SQL_TRUST_SERVER_CERTIFICATE === "true") {
      config.options.trustServerCertificate = true;
  }
}

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function getRules() {
  await poolConnect;
  try {
    const request = pool.request();
    const result = await request.execute("CalculationRule_SelectAll");
    console.dir(result);
    return result;
  } catch (err) {
    console.error("SQL Error:", err);
  }
}

module.exports = {
  pool,
  poolConnect,
  getRules
};
