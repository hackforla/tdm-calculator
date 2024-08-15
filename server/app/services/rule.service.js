const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

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

module.exports = {
  getByCalculationId
};
