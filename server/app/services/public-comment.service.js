const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const { sendPublicComment } = require("./sendgrid-service");

const postPublicComment = async (loginId, publicComment) => {
  try {
    // TODO: add selectedProjectIds to PublicComment table and stored proc.
    await poolConnect;
    const request = pool.request();
    request.input("name", mssql.VarChar, publicComment.name);
    request.input("email", mssql.VarChar, publicComment.email);
    request.input("comment", mssql.VarChar, publicComment.comment);
    request.input(
      "forwardToWebTeam",
      mssql.Bit,
      publicComment.forwardToWebTeam
    );
    request.output("id", mssql.Int, null);

    const response = await request.execute("PublicComment_Insert");

    await sendPublicComment(loginId, publicComment);

    return response.returnValue;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  postPublicComment
};
