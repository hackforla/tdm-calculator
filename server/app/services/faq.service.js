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

const getFaqById = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    const response = await request.execute("Faq_SelectById");
    request.input("faqId", mssql.Int, null);
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const postFaq = async faq => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("question", mssql.VarChar, faq.question);
    request.input("answer", mssql.VarChar, faq.answer);
    request.input("displayOrder", mssql.Int, faq.displayOrder);
    request.input("faqCategoryId", mssql.Int, faq.faqCategoryId);
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
    request.input("idd", mssql.Int, faq.id);
    request.input("question", mssql.VarChar, faq.question);
    request.input("answer", mssql.VarChar, faq.answer);
    request.input("displayOrder", mssql.Int, faq.displayOrder);
    request.input("faqCategoryId", mssql.Int, faq.faqCategoryId);
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
  getFaqById,
  postFaq,
  putFaqById,
  deleteFaq
};
