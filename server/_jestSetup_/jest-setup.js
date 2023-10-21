const { start } = require("./jest-mssql-container");

module.exports = async () => {
  await start();
};
