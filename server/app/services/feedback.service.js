const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const { sendFeedback } = require("./sendgrid-service");

const post = async (loginId, feedback) => {
  try {
    // TODO: add selectedProjectIds to feedback table and stored proc.
    await poolConnect;
    const request = pool.request();
    request.input("name", mssql.VarChar, feedback.name);
    request.input("email", mssql.VarChar, feedback.email);
    request.input("comment", mssql.VarChar, feedback.comment);
    request.input("forwardToWebTeam", mssql.Bit, feedback.forwardToWebTeam);
    request.output("id", mssql.Int, null);

    const response = await request.execute("Feedback_Insert");

    await sendFeedback(loginId, feedback);

    return response.returnValue;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  post
};
