const sgMail = require("@sendgrid/mail");
const clientUrl = process.env.CLIENT_URL;
const sendgridKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.EMAIL_SENDER;

const droCentralEmail = process.env.DRO_CENTRAL_EMAIL;
const droValleyEmail = process.env.DRO_VALLEY_EMAIL;
const droWestsideEmail = process.env.DRO_WESTSIDE_EMAIL;

sgMail.setApiKey(sendgridKey);

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
              <p><a href="${clientUrl}/projects/${projectId}">Visit Application Snapshot</a></p>
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
  sendSnapshotSubmissionToDRO
};
