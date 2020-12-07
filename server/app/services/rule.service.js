const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getAll = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const r = await request.execute("CalculationRule_SelectAll");
    return r.recordsets[0].map(rule => {
      rule.value = JSON.parse(rule.value);
      rule.choices = JSON.parse(rule.choices);
      return rule;
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const getById = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Id", mssql.Int, id);
    // const r = await mssql.executeProc(
    //   "CalculationRule_SelectById",
    //   sqlRequest => {
    //     sqlRequest.addParameter("Id", mssql.Int, id);
    //   }
    // );
    const r = await request.execute("CalculationRule_SelectById");
    if (r.recordset && r.recordset.length) {
      const rule = r.recordset[0];
      rule.value = JSON.parse(rule.value);
      rule.choices = JSON.parse(rule.choices);
      return rule;
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getByCalculationId = async calculationId => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("CalculationId", mssql.Int, calculationId);
    const r = await request.execute("CalculationRule_SelectByCalculationId");
    const rules = r.recordset;
    return rules.map(rule => {
      rule.value = JSON.parse(rule.value);
      rule.choices = JSON.parse(rule.choices);
      return rule;
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO: some columns missing
const post = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("calculationId", mssql.Int, item.calculationId);
    request.input("code", mssql.NVarChar, item.code); // 50
    request.input("name", mssql.NVarChar, item.name); // 100
    request.input("category", mssql.VarChar, item.category); // 20
    request.input("dataType", mssql.VarChar, item.dataType); // 20
    request.input("units", mssql.VarChar, item.units); // 50
    request.input("value", mssql.VarChar, JSON.stringify(item.value)); // 200
    request.input("functionBody", mssql.NVarChar, item.functionBody); // 2000
    request.input("displayOrder", mssql.Int, item.displayOrder);
    request.output("id", mssql.Int, null);

    const response = await request.execute("CalculationRule_Insert");

    return response.output;
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO: some columns missing
const put = async item => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("calculationId", mssql.Int, item.calculationId);
    request.input("code", mssql.NVarChar, item.code); // 50
    request.input("name", mssql.NVarChar, item.name); // 100
    request.input("category", mssql.VarChar, item.category); // 20
    request.input("dataType", mssql.VarChar, item.dataType); // 20
    request.input("units", mssql.VarChar, item.units); // 50
    request.input("value", mssql.VarChar, JSON.stringify(item.value)); // 200
    request.input("functionBody", mssql.NVarChar, item.functionBody); // 2000
    request.input("displayOrder", mssql.Int, item.displayOrder);
    request.input("id", mssql.Int, item.id);

    await request.execute("CalculationRule_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Id", mssql.Int, id);

    await request.execute("CalculationRule_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getAll,
  getByCalculationId,
  getById,
  post,
  put,
  del
};
