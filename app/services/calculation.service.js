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

const post = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("name", mssql.NVarChar, item.name); // 50
    request.input("description", mssql.NVarChar, item.description); // MAX
    request.input("deprecated", mssql.Bit, item.deprecated);
    request.output("id", mssql.Int, null);
    const response = await request.execute("Calculation_Insert");

    return response.outputParameters;
  } catch (err) {
    return Promise.reject(err);
  }
};

const put = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("name", mssql.NVarChar, item.name); // 50
    request.input("description", mssql.NVarChar, item.description); // MAX
    request.input("deprecated", mssql.Bit, item.deprecated);
    request.input("id", mssql.Int, item.id);
    await request.execute("Calculation_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    await request.execute("Calculation_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del
};
