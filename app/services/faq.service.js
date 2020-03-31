const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getFaq = async () => {
  try {
    const response = await mssql.executeProc("Faq_SelectAll");
    return response.resultSets[0];
  } catch (err) {
    return Promise.reject(err);
  }
};

const postFaq = async faq => {
  try {
    const response = await mssql.executeProc("Faq_Insert", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, null);
      sqlRequest.addParameter("question", TYPES.VarChar, faq.question, {
        length: 250
      });
      sqlRequest.addParameter("answer", TYPES.VarChar, faq.answer, {
        length: 500
      });
    });
    return response.returnStatus;
  } catch (err) {
    return Promise.reject(err);
  }
};

const putFaqById = async faq => {
  try {
    await mssql.executeProc("Faq_Update", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, faq.faqId);
      sqlRequest.addParameter("question", TYPES.VarChar, faq.question, {
        length: 250
      });
      sqlRequest.addParameter("answer", TYPES.VarChar, faq.answer, {
        length: 500
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteFaq = async id => {
  try {
    await mssql.executeProc("Faq_Delete", sqlRequest => {
      sqlRequest.addParameter("faqId", TYPES.Int, id);
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getFaq,
  postFaq,
  putFaqById,
  deleteFaq
};
