const { stop } = require("./jest-mssql-container");

module.exports = async () => {
  await stop();
};
