const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getAll = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Calculation_SelectAll");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getById = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Id", mssql.Int, id);
    const response = await request.execute("Calculation_SelectById");

    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getAll,
  getById
};
