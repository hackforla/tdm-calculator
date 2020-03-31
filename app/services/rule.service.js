const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = async () => {
  try {
    const r = await mssql.executeProc("CalculationRule_SelectAll");
    return r.resultSets[0].map(rule => {
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
    const r = await mssql.executeProc(
      "CalculationRule_SelectById",
      sqlRequest => {
        sqlRequest.addParameter("Id", TYPES.Int, id);
      }
    );
    if (r.resultSets && r.resultSets[0] && r.resultSets[0].length) {
      const rule = r.resultSets[0][0];
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
    const r = await mssql.executeProc(
      "CalculationRule_SelectByCalculationId",
      sqlRequest => {
        sqlRequest.addParameter("CalculationId", TYPES.Int, calculationId);
      }
    );
    const rules = r.resultSets[0];
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
    const response = await mssql.executeProc(
      "CalculationRule_Insert",
      sqlRequest => {
        sqlRequest.addParameter("calculationId", TYPES.Int, item.calculationId);
        sqlRequest.addParameter("code", TYPES.NVarChar, item.code, {
          length: 50
        });
        sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
          length: 100
        });
        sqlRequest.addParameter("category", TYPES.VarChar, item.category, {
          length: 20
        });
        sqlRequest.addParameter("dataType", TYPES.VarChar, item.dataType, {
          length: 20
        });
        sqlRequest.addParameter("units", TYPES.VarChar, item.units, {
          length: 50
        });
        sqlRequest.addParameter(
          "value",
          TYPES.VarChar,
          JSON.stringify(item.value),
          {
            length: 200
          }
        );
        sqlRequest.addParameter(
          "functionBody",
          TYPES.NVarChar,
          item.functionBody,
          {
            length: 2000
          }
        );
        sqlRequest.addParameter("displayOrder", TYPES.Int, item.displayOrder);
        sqlRequest.addOutputParameter("id", TYPES.Int, null);
      }
    );
    return response.outputParameters;
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO: some columns missing
const put = async item => {
  try {
    await mssql.executeProc("CalculationRule_Update", sqlRequest => {
      sqlRequest.addParameter("code", TYPES.NVarChar, item.code, {
        length: 50
      });
      sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
        length: 100
      });
      sqlRequest.addParameter("category", TYPES.VarChar, item.category, {
        length: 20
      });
      sqlRequest.addParameter("dataType", TYPES.VarChar, item.dataType, {
        length: 20
      });
      sqlRequest.addParameter("units", TYPES.VarChar, item.units, {
        length: 50
      });
      sqlRequest.addParameter(
        "value",
        TYPES.VarChar,
        JSON.stringify(item.value),
        {
          length: 200
        }
      );
      sqlRequest.addParameter(
        "functionBody",
        TYPES.NVarChar,
        item.functionBody,
        {
          length: 2000
        }
      );
      sqlRequest.addParameter("displayOrder", TYPES.Int, item.displayOrder);
      sqlRequest.addParameter("id", TYPES.Int, item.id);
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async id => {
  try {
    await mssql.executeProc("CalculationRule_Delete", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    });
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
