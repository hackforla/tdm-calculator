const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getFaq = () => {
  return mssql.executeProc("Faq_SelectAll").then(response => {
    return response.resultSets[0];
  });
};

const postFaq = faq => {
  return mssql
    .executeProc("Faq_Insert", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, null);
      sqlRequest.addParameter("question", TYPES.VarChar, faq.question, {
        length: 250
      });
      sqlRequest.addParameter("answer", TYPES.VarChar, faq.answer, {
        length: 500
      });
    })
    .then(response => {
      return response.returnStatus;
    });
};

const putFaqById = faq => {
  return mssql
    .executeProc("Faq_Update", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, faq.faqId);
      sqlRequest.addParameter("question", TYPES.VarChar, faq.question, {
        length: 250
      });
      sqlRequest.addParameter("answer", TYPES.VarChar, faq.answer, {
        length: 500
      });
    })
    .then(response => {
      return response.outputParameters;
    });
};

const deleteFaq = id => {
  return mssql.executeProc("Faq_Delete", sqlRequest => {
    sqlRequest.addParameter("faqId", TYPES.Int, id);
  });
};

module.exports = {
  getFaq,
  postFaq,
  putFaqById,
  deleteFaq
};
