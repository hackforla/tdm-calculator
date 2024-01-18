const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getFaqCategories = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("FaqCategory_SelectAll");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

// const postFaqCategory = async faqCategory => {
//   try {
//     await poolConnect;
//     const request = pool.request();
//     request.input("id", mssql.Int, null);
//     request.input("name", mssql.VarChar, faqCategory.name); // 250
//     request.input("displayOrder", mssql.Int, faqCategory.displayOrder); // 500
//     const response = await request.execute("FaqCategory_Insert");
//     return response.returnStatus;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

const postCategories = async faqCategories => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("name", mssql.VarChar, 250);
    tvp.columns.add("displayOrder", mssql.Int);
    tvp.columns.add("faqs", mssql.NVarChar, mssql.MAX);

    faqCategories.forEach(faqCategory => {
      tvp.rows.add(
        faqCategory.name,
        faqCategory.displayOrder,
        JSON.stringify(faqCategory.faqs)
      );
    });

    request.input("faqCategories", tvp);
    const response = await request.execute("FaqCategory_InsertAll");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

// const putFaqCategoryById = async faqCategory => {
//   try {
//     await poolConnect;
//     const request = pool.request();
//     request.input("id", mssql.Int, faqCategory.id);
//     request.input("name", mssql.VarChar, faqCategory.name); // 250
//     request.input("displayOrder", mssql.Int, faqCategory.displayOrder); // 500
//     await request.execute("FaqCategory_Update");
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// const deleteFaqCategory = async id => {
//   try {
//     await poolConnect;
//     const request = pool.request();
//     request.input("id", mssql.Int, id);
//     await request.execute("FaqCategory_Delete");
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

module.exports = {
  getFaqCategories,
  // postFaqCategory,
  postCategories,
  // putFaqCategoryById,
  // deleteFaqCategory
};
