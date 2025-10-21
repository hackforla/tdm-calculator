const { sanitizeHtml } = require("../../middleware/sanitize-html");
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
      //Sanitize rule descriptions that contain HTML. It renders tooltips with dangerouslySetInnerHTML.
      //Reference Decision Records https://github.com/hackforla/tdm-calculator/wiki/Decision-Records
      rule.description = sanitizeHtml(rule.description);
      return rule;
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateDescription = async ({ id, loginId, description }) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    request.input("loginId", mssql.Int, loginId);
    request.input("description", mssql.NVarChar, description);
    const result = await request.execute("CalculationRule_UpdateDescription");

    return result;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getByCalculationId,
  updateDescription
};
