const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const { sanitizeHtml } = require("../../middleware/sanitize-html");

const getAll = async (includeRules = false) => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Calculation_SelectAll");
    const calculations = response.recordset;

    if (includeRules) {
      const ruleResult = await request.execute("CalculationRule_SelectAll");
      const rules = ruleResult.recordset;
      calculations.forEach(calculation => {
        const calculationRules = rules
          .filter(rule => rule.calculationId == calculation.id)
          .map(rule => {
            rule.value = JSON.parse(rule.value);
            rule.choices = JSON.parse(rule.choices);
            //Sanitize rule descriptions that contain HTML. It renders tooltips with dangerouslySetInnerHTML.
            //Reference Decision Records https://github.com/hackforla/tdm-calculator/wiki/Decision-Records
            rule.description = sanitizeHtml(rule.description);
            return rule;
          });

        calculation.rules = calculationRules;
      });
    }

    return calculations;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getById = async (id, includeRules = false) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Id", mssql.Int, id);
    const response = await request.execute("Calculation_SelectById");

    if (response.recordset && response.recordset.length > 0) {
      const calculation = response.recordset[0];
      if (includeRules) {
        const request2 = pool.request();
        request2.input("calculationId", mssql.Int, id);
        const rules = await request2.execute(
          "CalculationRule_SelectByCalculationId"
        );
        calculation.rules = rules.recordset;
      }
      return calculation;
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
