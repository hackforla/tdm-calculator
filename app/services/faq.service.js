const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getFaq = () => {
  return mssql.executeProc("Faq_SelectAll");
};

const postFaq = faq => {
  return mssql
    .executeProc("Faq_Insert", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, faq.faqId);
      sqlRequest.addParameter("question", TYPES.NVarChar, faq.question, {
        length: 250
      });
      sqlRequest.addParameter("answer"),
        TYPES.NVarChar,
        faq.answer,
        {
          length: 500
        };
    })
    .then(response => {
      return response.outputParameters;
    });
};

const putFaqById = faq => {
    return mssql
    .executeProc("Faq_Update", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, faq.faqId);
      sqlRequest.addParameter("question", TYPES.NVarChar, faq.question, {
        length: 250
      });
      sqlRequest.addParameter("answer"),
        TYPES.NVarChar,
        faq.answer,
        {
          length: 500
        };
    })
    .then(response => {
      return response.outputParameters;
    });
};

const deleteFaq = id => {
  return mssql.executeProc("Faq_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};

module.exports = {
  getFaq,
  postFaq,
  putFaqById,
  deleteFaq
};
