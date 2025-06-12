const sgClient = require("@sendgrid/client");
const sgMail = require("@sendgrid/mail");

const clientUrl = process.env.CLIENT_URL;
const sendgridKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.EMAIL_SENDER;
const laCityEmail = process.env.EMAIL_PUBLIC_COMMENT_LA_CITY;
const webTeamEmail = process.env.EMAIL_PUBLIC_COMMENT_WEB_TEAM;
const droCentralEmail = process.env.DRO_CENTRAL_EMAIL;
const droValleyEmail = process.env.DRO_VALLEY_EMAIL;
const droWestsideEmail = process.env.DRO_WESTSIDE_EMAIL;
const sendGridHost = process.env.SENDGRID_HOST;
const sendGridPort =
  sendGridHost == "localhost" ? process.env.SENDGRID_EXPOSED_PORT : 3000;

if (
  process.env.NODE_ENV === "production" ||
  !process.env.SENDGRID_EXPOSED_PORT
) {
  sgMail.setApiKey(sendgridKey);
} else {
  // use sgClient to set the mock service URL in development
  sgClient.setApiKey(sendgridKey);
  sgClient.setDefaultRequest(
    "baseUrl",
    "http://" + sendGridHost + ":" + sendGridPort
  );
  sgMail.setClient(sgClient);
}

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

const sendFeedback = async (loginId, feedback, projects) => {
  try {
    const { name, email, comment, forwardToWebTeam } = feedback;

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

const sendSnapshotSubmissionToDRO = async (projectId, droId) => {
  const droEmail = {
    1: droCentralEmail,
    2: droValleyEmail,
    3: droWestsideEmail
  };
  const droName = {
    1: "Metro Development Review Office",
    2: "Valley Development Review Office",
    3: "West Los Angeles Development Review Office"
  };

  const msg = {
    to: `${droEmail[droId]}`,
    from: senderEmail,
    subject: `New Snapshot Submission for DRO: ${droName[droId]}`,
    text: `New Snapshot Submission for DRO: ${droName[droId]}`,
    html: `<p>Sample Email For Snapshot Submittal Notification</p>
              <br>
              <p>Hello, there's a new snapshot submission. Please click the following link to view the snapshot
              <br>
              <p><a href="${clientUrl}/calculation/5/${projectId}">Visit Application Snapshot</a></p>
              <br>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`
  };
  return sgMail.send(msg, false);
};

module.exports = {
  send,
  sendVerifyUpdateConfirmation,
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
  sendFeedback,
  sendSnapshotSubmissionToDRO
};
