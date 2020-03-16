const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = async () => {
  try {
    const response = await mssql.executeProc("Calculation_SelectAll");
    return response.resultSets[0];
  } catch (err) {
    return Promise.reject(err);
  }
};

const getById = async id => {
  try {
    const response = await mssql.executeProc(
      "Calculation_SelectById",
      sqlRequest => {
        sqlRequest.addParameter("Id", TYPES.Int, id);
      }
    );
    if (
      response.resultSets &&
      response.resultSets[0] &&
      response.resultSets[0].length > 0
    ) {
      return response.resultSets[0][0];
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

const post = async item => {
  try {
    const response = await mssql.executeProc(
      "Calculation_Insert",
      sqlRequest => {
        sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
          length: 50
        });
        sqlRequest.addParameter(
          "description",
          TYPES.NVarChar,
          item.description,
          {
            length: Infinity
          }
        );
        sqlRequest.addParameter("deprecated", TYPES.Bit, item.deprecated);
        sqlRequest.addOutputParameter("id", TYPES.Int, null);
      }
    );
    return response.outputParameters;
  } catch (err) {
    return Promise.reject(err);
  }
};

const put = async item => {
  try {
    await mssql.executeProc("Calculation_Update", sqlRequest => {
      sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
        length: 50
      });
      sqlRequest.addParameter("description", TYPES.NVarChar, item.description, {
        length: Infinity
      });
      sqlRequest.addParameter("deprecated", TYPES.Bit, item.deprecated);
      sqlRequest.addParameter("id", TYPES.Int, item.id);
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const del = async id => {
  try {
    await mssql.executeProc("Calculation_Delete", sqlRequest => {
      sqlRequest.addParameter("id", TYPES.Int, id);
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del
};
