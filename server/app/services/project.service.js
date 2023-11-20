const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getAll = async loginId => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("LoginId", mssql.Int, loginId);
    const response = await request.execute("Project_SelectAll");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

const getById = async (loginId, id) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("LoginId", mssql.Int, loginId);
    request.input("Id", mssql.Int, id);
    const response = await request.execute("Project_SelectById");
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
    request.input("name", mssql.NVarChar, item.name); // 200
    request.input("address", mssql.NVarChar, item.address); // 200
    request.input("description", mssql.NVarChar, item.description); // max
    request.input("formInputs", mssql.NVarChar, item.formInputs); // max
    request.input("loginId", mssql.Int, item.loginId);
    request.input("calculationId", mssql.Int, item.calculationId);
    request.output("id", mssql.Int, null);
    const response = await request.execute("Project_Insert");
    return response.output;
  } catch (err) {
    return Promise.reject(err);
  }
};

const put = async item => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("name", mssql.NVarChar, item.name); // 200
    request.input("address", mssql.NVarChar, item.address); // 200
    request.input("description", mssql.NVarChar, item.description); // max
    request.input("formInputs", mssql.NVarChar, item.formInputs); // max
    request.input("loginId", mssql.Int, item.loginId);
    request.input("calculationId", mssql.Int, item.calculationId);
    request.input("id", mssql.Int, item.id);
    await request.execute("Project_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async (loginId, id) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("loginId", mssql.Int, loginId);
    request.input("id", mssql.Int, id);
    await request.execute("Project_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

const hide = async (ids, hide, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("id", mssql.Int);

    ids.forEach(id => {
      tvp.rows.add(id);
    });

    request.input("ids", tvp);
    request.input("hide", hide ? 1 : 0);
    request.input("loginId", loginId);
    const response = await request.execute("Project_Hide");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const trash = async (ids, trash, loginId) => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("id", mssql.Int);

    ids.forEach(id => {
      tvp.rows.add(id);
    });

    request.input("ids", tvp);
    request.input("trash", trash);
    request.input("loginId", loginId);
    const response = await request.execute("Project_Trash");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const snapshot = async (id, loginId, name) => {
  try {
    await poolConnect;
    const request = pool.request();

    request.input("id", id);
    request.input("loginId", loginId);
    request.input("name", name);

    const response = await request.execute("Project_Snapshot");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

const getAllArchivedProjects = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Project_SelectAllArchived");
    return response.recordset;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del,
  hide,
  trash,
  snapshot,
  getAllArchivedProjects
};
