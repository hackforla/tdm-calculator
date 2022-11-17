const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getFaqCategory = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("FaqCategory_SelectAll");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const postFaqCategory = async faqCategory => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, null);
    request.input("name", mssql.VarChar, faqCategory.name); // 250
    request.input("displayOrder", mssql.Int, faqCategory.displayOrder); // 500
    const response = await request.execute("FaqCategory_Insert");
    return response.returnStatus;
  } catch (err) {
    return Promise.reject(err);
  }
};

const putFaqCategoryById = async faqCategory => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, faqCategory.id);
    request.input("name", mssql.VarChar, faqCategory.name); // 250
    request.input("displayOrder", mssql.Int, faqCategory.displayOrder); // 500
    await request.execute("FaqCategory_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteFaqCategory = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    await request.execute("FaqCategory_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getFaqCategory,
  postFaqCategory,
  putFaqCategoryById,
  deleteFaqCategory
};
