const { stop } = require("./mssql-container-setup");

module.exports = async () => {
  await stop();
};
