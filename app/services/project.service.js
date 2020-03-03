const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql.executeProc("Project_SelectAll").then(response => {
    return response.resultSets[0];
  });
};

const getById = id => {
  return mssql
    .executeProc("Project_SelectById", sqlRequest => {
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
    })
    .catch(err => console.log("err", err));
};

const post = item => {
  return mssql
    .executeProc("Project_Insert", sqlRequest => {
      sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
        length: 200
      });
      sqlRequest.addParameter("address", TYPES.NVarChar, item.address, {
        length: 200
      });
      sqlRequest.addParameter("description", TYPES.NVarChar, item.description, {
        length: Infinity
      });
      sqlRequest.addParameter("formInputs", TYPES.NVarChar, item.formInputs, {
        length: Infinity
      });
      sqlRequest.addParameter("loginId", TYPES.Int, item.loginId);
      sqlRequest.addParameter("calculationId", TYPES.Int, item.calculationId);
      sqlRequest.addOutputParameter("id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};

const put = item => {
  console.log(item);
  return mssql.executeProc("Project_Update", sqlRequest => {
    sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
      length: 200
    });
    sqlRequest.addParameter("address", TYPES.NVarChar, item.address, {
      length: 200
    });
    sqlRequest.addParameter("description", TYPES.NVarChar, item.description, {
      length: Infinity
    });
    sqlRequest.addParameter("formInputs", TYPES.NVarChar, item.formInputs, {
      length: Infinity
    });
    sqlRequest.addParameter("loginId", TYPES.Int, item.loginId);
    sqlRequest.addParameter("calculationId", TYPES.Int, item.calculationId);
    sqlRequest.addParameter("id", TYPES.Int, item.id);
  });
};

const del = id => {
  return mssql.executeProc("Project_Delete", sqlRequest => {
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
