const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getAll = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Dro_SelectAll");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

const getById = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Id", mssql.Int, id);
    const response = await request.execute("Dro_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
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
    request.input("name", mssql.NVarChar, item.name); // NVARCHAR(200)
    request.input("displayOrder", mssql.Int, item.displayOrder); // INT
    request.output("id", mssql.Int, null);
    const response = await request.execute("Dro_Insert");
    return response.output;
  } catch (err) {
    return Promise.reject(err);
  }
};

const put = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, item.id);
    request.input("name", mssql.NVarChar, item.name); // NVARCHAR(200)
    request.input("displayOrder", mssql.Int, item.displayOrder); // INT
    await request.execute("Dro_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    await request.execute("Dro_Delete");
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
