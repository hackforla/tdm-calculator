const { pool, poolConnect } = require("./tedious-pool");
const { sendFeedback } = require("./email.service");
const projectService = require("../services/project.service");
const mssql = require("mssql");

const post = async (loginId, feedback) => {
  try {
    let projects = [];
    let projectIds = feedback.selectedProjectIds || [];

    if (loginId && projectIds.length > 0) {
      for (let i = 0; i < projectIds.length; i++) {
        const p = await projectService.getById(loginId, projectIds[i]);
        projects.push(p);
      }
    }

    await poolConnect;
    const request = pool.request();
    request.input("loginId", mssql.Int, loginId);
    request.input("subject", mssql.NVarChar(250), feedback.subject);
    request.input("comment", mssql.NVarChar(mssql.MAX), feedback.comment);
    request.input("forwardToWebTeam", mssql.Bit, feedback.forwardToWebTeam);
    request.output("id", mssql.Int, null);

    // Build Table-Valued Parameter matching dbo.IdList
    const tvp = new mssql.Table();
    tvp.columns.add("id", mssql.Int);
    projectIds.forEach(id => {
      tvp.rows.add(id);
    });
    request.input("projectIds", tvp);

    const response = await request.execute("Feedback_Insert");

    await sendFeedback(loginId, feedback, projects);

    return response.output.id;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  post
};
