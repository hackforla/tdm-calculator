const { sanitizeHtml } = require("../../middleware/sanitize-html");
const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");

const getAbout = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("About_SelectAll");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const postAbout = async about => {
  try {
    await poolConnect;
    const request = pool.request();
    const tvp = new mssql.Table();
    tvp.columns.add("title", mssql.VarChar, 250);
    tvp.columns.add("displayOrder", mssql.Int);
    tvp.columns.add("content", mssql.NVarChar, mssql.MAX);

    about.forEach(aboutItem => {
      // About page content is admin-created HTML that gets rendered with Interweave
      // Added for extra safety precaution
      //Reference Decision Records https://github.com/hackforla/tdm-calculator/wiki/Decision-Records
      const sanitizeAboutContent = sanitizeHtml(aboutItem.content || "");
      tvp.rows.add(
        aboutItem.title,
        aboutItem.displayOrder,
        sanitizeAboutContent
      );
    });

    request.input("abouts", tvp);
    const response = await request.execute("About_InsertAll");
    return response.returnValue;
  } catch (err) {
    console.log("err:", err);
    return Promise.reject(err);
  }
};

module.exports = {
  getAbout,
  postAbout
};
