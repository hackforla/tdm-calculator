const { start } = require("./mssql-container");

module.exports = async () => {
  await start();
};
