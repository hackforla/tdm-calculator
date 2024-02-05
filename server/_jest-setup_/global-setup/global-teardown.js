const { stop } = require("../utils/mssql-container-setup");

module.exports = async () => {
  await stop();
};
