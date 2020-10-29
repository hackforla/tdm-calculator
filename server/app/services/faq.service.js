const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getFaq = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Faq_SelectAll");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const postFaq = async faq => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("faqId", mssql.Int, null);
    request.input("question", mssql.VarChar, faq.question); // 250
    request.input("answer", mssql.VarChar, faq.answer); // 500
    const response = await request.execute("Faq_Insert");
    return response.returnStatus;
  } catch (err) {
    return Promise.reject(err);
  }
};

const putFaqById = async faq => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("faqId", mssql.Int, faq.faqId);
    request.input("question", mssql.VarChar, faq.question); // 250
    request.input("answer", mssql.VarChar, faq.answer); // 500
    await request.execute("Faq_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteFaq = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("faqId", mssql.Int, id);
    await request.execute("Faq_Delete");
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
