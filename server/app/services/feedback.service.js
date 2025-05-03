const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const projectService = require("../services/project.service");
const sgMail = require("@sendgrid/mail");

const clientUrl = process.env.CLIENT_URL;
const sendgridKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.EMAIL_SENDER;
const laCityEmail = process.env.EMAIL_PUBLIC_COMMENT_LA_CITY;
const webTeamEmail = process.env.EMAIL_PUBLIC_COMMENT_WEB_TEAM;

sgMail.setApiKey(sendgridKey);

const formatDates = date => {
  return new Date(date)
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
    .replace(",", "");
};

const sendFeedback = async (loginId, feedback) => {
  try {
    const { name, email, comment, forwardToWebTeam, selectedProjectIds } =
      feedback;

    let projects = [];
    if (loginId && selectedProjectIds) {
      for (let i = 0; i < selectedProjectIds.length; i++) {
        const p = await projectService.getById(loginId, selectedProjectIds[i]);
        projects.push(p);
      }
    }

    let body = ` <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email</strong>: ${email ? email : "Anonymous"}</p>
              <p><strong>Comment</strong>: ${comment}</p>
              <p><strong>Forward To Website Team</strong>: ${
                forwardToWebTeam ? "Yes" : "No"
              } </p>
              `;
    if (projects && projects.length > 0) {
      body +=
        `<p><strong>Referenced Project(s)</strong></p>
        <p>Clicking on a link to one of the projects will allow you to log in to TDM, then, once login is successful, it will
        open the project.</p>
        <table style="list-style-type:none">
        <tr>
          <th style="text-align:left;">Name</th>
          <th style="text-align:left;">Address</th>
          <th style="text-align:left;">Date Saved</th>
          <th style="text-align:left;">Date Created</th>
          <th style="text-align:left;">Link</th>
        </tr>` +
        projects.map(project => {
          // console.log(project);
          return `<tr>
            <td>${project.name}</td>
            <td >
              ${JSON.parse(project.formInputs)["PROJECT_ADDRESS"]}
            </td>
            <td>${formatDates(project.dateModified)}</td>
            <td>${formatDates(project.dateCreated)}</td>
            <td> ${clientUrl}/login?projectId=${project.id}</td>
          </tr>`;
        }) +
        "</table></div>";
    }

    const msg = {
      to: laCityEmail,
      cc: forwardToWebTeam ? webTeamEmail : "",
      from: senderEmail,
      subject: `TDM Feedback Submission - ${name}`,
      text: `TDM Feedback Submission - ${name}`,
      html: body
    };

    return sgMail.send(msg, false);
  } catch (err) {
    console.error(err);
    return Promise.reject("Sending email to LA City or Website team failed.");
  }
};

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
  sendFeedback,
  post
};
