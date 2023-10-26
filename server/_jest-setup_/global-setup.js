const { start } = require("./mssql-container-setup");

module.exports = async () => {
  await start();
};
