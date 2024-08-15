const sgMail = require("@sendgrid/mail");
const clientUrl = process.env.CLIENT_URL;
const sendgridKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.EMAIL_SENDER;
const laCityEmail = process.env.EMAIL_PUBLIC_COMMENT_LA_CITY;
const webTeamEmail = process.env.EMAIL_PUBLIC_COMMENT_WEB_TEAM;
const projectService = require("../services/project.service");

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

const send = async (emailTo, emailFrom, subject, textBody, htmlBody) => {
  const msg = {
    to: emailTo,
    from: emailFrom,
    subject: subject,
    text: textBody,
    html: htmlBody
  };
  return sgMail.send(msg, false);
};

const sendVerifyUpdateConfirmation = async (email, token) => {
  const msg = {
    to: `${email}`,
    from: senderEmail,
    subject: "Verify Your Account Updates",
    text: "Verify Your Account Updates",
    html: `<p>Hello, your account has been updated.</p>
              <p>If you did not update your account please notify <a href = "mailto: ladot@lacity.org">ladot@lacity.org</a>.</p>
              <p><a href="${clientUrl}/confirm/${token}">Verify Account Updates</a></p>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`
  };
  return sgMail.send(msg, false);
};

const sendRegistrationConfirmation = async (email, token) => {
  const msg = {
    to: `${email}`,
    from: senderEmail,
    subject: "Verify Your Account",
    text: "Verify your account",
    html: `<p>Hello, please click the following link to verify your account.</p>
              <p><a href="${clientUrl}/confirm/${token}">Verify Me</a></p>
              <p>If you did not create a new account or update your account please notify <a href = "mailto: ladot@lacity.org">ladot@lacity.org</a>.</p>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`
  };
  return sgMail.send(msg, false);
};

const sendResetPasswordConfirmation = async (email, token) => {
  const msg = {
    to: `${email}`,
    from: senderEmail,
    subject: "Confirm Password Reset for TDM Calculator",
    text: "Confirm Password Reset for TDM Calculator",
    html: `<p>Hello, please click the following link to reset your password for TDM Calculator.</p>
              <br>
              <p><a href="${clientUrl}/resetPassword/${token}">Reset Password</a></p>
              <br>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`
  };
  return sgMail.send(msg, false);
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
          <th style="text-align:left;">Date Modified</th>
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

module.exports = {
  send,
  sendVerifyUpdateConfirmation,
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
  sendFeedback
};
