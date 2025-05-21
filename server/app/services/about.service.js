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
    tvp.columns.add("content", mssql.VarChar, mssql.MAX);

    about.forEach(aboutItem => {
      tvp.rows.add(aboutItem.name, aboutItem.displayOrder, aboutItem.about);
    });

    request.input("about", tvp);
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
