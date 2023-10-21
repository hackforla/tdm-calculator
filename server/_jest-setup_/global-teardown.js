const { stop } = require("./mssql-container");

module.exports = async () => {
  await stop();
};
