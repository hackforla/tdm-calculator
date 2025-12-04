const { sanitizeHtml } = require("../../middleware/sanitize-html");
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

const postCategories = async faqCategories => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("name", mssql.VarChar, 250);
    tvp.columns.add("displayOrder", mssql.Int);
    tvp.columns.add("faqs", mssql.NVarChar, mssql.MAX);

    faqCategories.forEach(faqCategory => {
      // FAQ content is admin-created HTML that gets rendered with Interweave
      // Added for extra safety precaution
      // Reference Decision Records https://github.com/hackforla/tdm-calculator/wiki/Decision-Records
      const sanitizedFaq = faqCategory.faqs.map(faq => ({
        ...faq,
        question: sanitizeHtml(faq.question || ""),
        answer: sanitizeHtml(faq.answer || "")
      }));

      tvp.rows.add(
        faqCategory.name,
        faqCategory.displayOrder,
        JSON.stringify(sanitizedFaq)
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

module.exports = {
  getFaqCategories,
  postCategories
};
