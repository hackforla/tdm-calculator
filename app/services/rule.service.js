const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql.executeProc("CalculationRule_SelectAll").then(response => {
    return response.resultSets[0].map(rule => {
      rule.value = JSON.parse(rule.value);
      return rule;
    });
  });
};

const getById = id => {
  return mssql
    .executeProc("CalculationRule_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      if (
        response.resultSets &&
        response.resultSets[0] &&
        response.resultSets[0].length
      ) {
        const rule = response.resultSets[0][0];
        rule.value = JSON.parse(rule.value);
        return rule;
      }
      return null;
    });
};

const getByCalculationId = calculationId => {
  return mssql
    .executeProc("CalculationRule_SelectByCalculationId", sqlRequest => {
      sqlRequest.addParameter("CalculationId", TYPES.Int, calculationId);
    })
    .then(response => {
      const rules = response.resultSets[0];
      return rules.map(rule => {
        rule.value = JSON.parse(rule.value);
        return rule;
      });
    });
};

const post = item => {
  return mssql
    .executeProc("CalculationRule_Insert", sqlRequest => {
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
    })
    .then(response => {
      return response.outputParameters;
    });
};

const put = item => {
  console.log(item);
  return mssql.executeProc("CalculationRule_Update", sqlRequest => {
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
    sqlRequest.addParameter("functionBody", TYPES.NVarChar, item.functionBody, {
      length: 2000
    });
    sqlRequest.addParameter("displayOrder", TYPES.Int, item.displayOrder);
    sqlRequest.addParameter("id", TYPES.Int, item.id);
  });
};

const del = id => {
  return mssql.executeProc("CalculationRule_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};

module.exports = {
  getAll,
  getByCalculationId,
  getById,
  post,
  put,
  del
};
