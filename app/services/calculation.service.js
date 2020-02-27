const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql.executeProc("Calculation_SelectAll").then(response => {
    return response.resultSets[0];
  });
};

const getById = id => {
  return mssql
    .executeProc("Calculation_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      if (
        response.resultSets &&
        response.resultSets[0] &&
        response.resultSets[0].length > 0
      ) {
        return response.resultSets[0][0];
      }
      return null;
    });
};

const post = item => {
  return mssql
    .executeProc("Calculation_Insert", sqlRequest => {
      sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
        length: 50
      });
      sqlRequest.addParameter("description", TYPES.NVarChar, item.description, {
        length: Infinity
      });
      sqlRequest.addParameter("deprecated", TYPES.Bit, item.deprecated);
      sqlRequest.addOutputParameter("id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};

const put = item => {
  console.log(item);
  return mssql.executeProc("Calculation_Update", sqlRequest => {
    sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
      length: 50
    });
    sqlRequest.addParameter("description", TYPES.NVarChar, item.description, {
      length: Infinity
    });
    sqlRequest.addParameter("deprecated", TYPES.Bit, item.deprecated);
    sqlRequest.addParameter("id", TYPES.Int, item.id);
  });
};

const del = id => {
  return mssql.executeProc("Calculation_Delete", sqlRequest => {
    sqlRequest.addParameter("id", TYPES.Int, id);
  });
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del
};
