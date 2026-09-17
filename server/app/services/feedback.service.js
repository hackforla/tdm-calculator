const { pool, poolConnect } = require("./tedious-pool");
const { sendFeedback } = require("./email.service");
const projectService = require("../services/project.service");
const mssql = require("mssql");

const post = async (loginId, feedback) => {
  try {
    let projects = [];
    let projectIds = feedback.selectedProjectIds;
    if (loginId && projectIds) {
      for (let i = 0; i < projectIds.length; i++) {
        const p = await projectService.getById(loginId, projectIds[i]);
        projects.push(p);
      }
    }
    // TODO: add selectedProjectIds to feedback table and stored proc.
    await poolConnect;
    const request = pool.request();
    request.input("subject", mssql.VarChar, feedback.subject);
    request.input("comment", mssql.VarChar, feedback.comment);
    request.input("forwardToWebTeam", mssql.Bit, feedback.forwardToWebTeam);
    request.input("loginId", mssql.Int, loginId);
    request.output("id", mssql.Int, null);

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
