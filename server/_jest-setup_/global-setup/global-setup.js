const { start } = require("../utils/mssql-container-setup");

module.exports = async () => {
  await start();
};
