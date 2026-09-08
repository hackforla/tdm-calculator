const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const dotenv = require("dotenv");
dotenv.config();

const getAll = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Config_SelectAll");
    let result = response.recordset;
    result.push({
      code: "NODE_ENV",
      value: process.env.NODE_ENV || "Not Set"
    });
    result.push({
      code: "ALLOWED_ADMIN_EMAIL_DOMAINS",
      value: process.env.ALLOWED_ADMIN_EMAIL_DOMAINS || "Not Set"
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getByCode = async code => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("code", mssql.Int, code);
    const response = await request.execute("Config_Select");
    if (response.recordset && response.recordset.length > 0) {
      let result = response.recordset[0];
      return result;
    } else {
      return null;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const post = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("code", mssql.NVarChar, item.code); // 250
    request.input("value", mssql.NVarChar, item.value); // max
    const response = await request.execute("Config_Insert");
    return response.output;
  } catch (err) {
    return Promise.reject(err);
  }
};

const put = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("code", mssql.NVarChar, item.code); // 250
    request.input("value", mssql.NVarChar, item.value); // max
    await request.execute("Code_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async code => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("code", mssql.Int, code);
    await request.execute("Code_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getAll,
  getByCode,
  post,
  put,
  del
};
