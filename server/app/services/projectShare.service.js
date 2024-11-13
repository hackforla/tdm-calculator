const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getById = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    const response = await request.execute("ProjectShare_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const getByProjectId = async projectId => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("ProjectId", mssql.Int, projectId);
    const response = await request.execute("ProjectShare_SelectByProjectId");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const post = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("email", mssql.NVarChar, item.email); // 100
    request.input("projectId", mssql.Int, item.projectId);
    request.output("id", mssql.Int, null);
    const response = await request.execute("ProjectShare_Insert");
    return response.output;
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    await request.execute("ProjectShare_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getById,
  getByProjectId,
  post,
  del
};
