const { Connection, Request } = require("tedious");
const ConnectionPool = require("tedious-connection-pool");
const dotenv = require("dotenv");

dotenv.config();

const poolConfig = { min: 2, max: 4, log: false };

var connectionConfig = {
  server: process.env.SQL_SERVER_NAME,
  userName: process.env.SQL_USER_NAME,
  password: process.env.SQL_PASSWORD,
  options: {
    database: process.env.SQL_DATABASE_NAME,
    instanceName: process.env.SQL_INSTANCE_NAME,
    port: process.env.SQL_SERVER_PORT || 1433
  }
};

const pool = new ConnectionPool(poolConfig, connectionConfig);
pool.on("error", err => {
  console.error(err);
});

function executeProc(procName, paramsCallback) {
  return new Promise((resolve, reject) => {
    pool.acquire((err, conn) => {
      if (err) {
        reject(err);
        return;
      }

      let setIndex = -1;
      const response = {};

      const request = new Request(procName, (err, rowcount) => {
        conn.release();
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
      // Get parameters from setParamsCallback callback
      if (paramsCallback) {
        paramsCallback(request);
      }

      request.on("row", columns => {
        response.resultSets = response.resultSets || [];
        response.resultSets[setIndex] = response.resultSets[setIndex] || [];
        const row = {};
        columns.map((cell, ordinal) => {
          if (cell.value === null) {
            row[cell.metadata.colName || ordinal] = null;
          } else {
            row[cell.metadata.colName || ordinal] = cell.value;
          }
        });
        response.resultSets[setIndex].push(row);
      });

      request.on("returnValue", (paramName, value, metadata) => {
        response.outputParameters = response.outputParameters || {};
        response.outputParameters[paramName] = value;
      });

      request.on("columnMetadata", function(columns) {
        setIndex++;
      });

      request.on("doneProc", function(rowCount, more, returnStatus, rows) {
        response.returnStatus = returnStatus;
      });

      conn.callProcedure(request);
    });
  });
}

module.exports = {
  pool,
  executeProc
};
