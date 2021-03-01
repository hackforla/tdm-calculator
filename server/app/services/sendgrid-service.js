const sgMail = require("@sendgrid/mail");
const clientUrl = process.env.CLIENT_URL;
const sendgridKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.EMAIL_SENDER;
const laCityEmail = process.env.EMAIL_PUBLIC_COMMENT_LA_CITY;
const webTeamEmail = process.env.EMAIL_PUBLIC_COMMENT_WEB_TEAM;

sgMail.setApiKey(sendgridKey);

const send = async (emailTo, emailFrom, subject, textBody, htmlBody) => {
  const msg = {
    to: emailTo,
    from: emailFrom,
    subject: subject,
    text: textBody,
    html: htmlBody
  };
  return sgMail.send(msg, false, err => {
    if (err) {
      return Promise.reject(`Sending email failed. ${err.message}`);
    }
    return Promise.resolve(true);
  });
};

const sendRegistrationConfirmation = async (email, token) => {
  const msg = {
    to: `${email}`,
    from: senderEmail,
    subject: "Verify Your Account",
    text: "Verify your account",
    html: `<p>Hello, please click the following link to verify your account.</p>
              <br>
              <p><a href="${clientUrl}/confirm/${token}">Verify Me</a></p>
              <br>
              <p>Thanks,</p>
              <p>TDM Calculator Team</p>`
  };
  return sgMail.send(msg, false, err => {
    if (err) {
      return Promise.reject("Sending registration confirmation email failed.");
    }
    return Promise.resolve(true);
  });
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
  return sgMail.send(msg, false, err => {
    if (err) {
      return Promise.reject(
        "Sending password reset confirmation email failed."
      );
    } else {
      return Promise.resolve(true);
    }
  });
};

const sendPublicComment = async publicCommentData => {
  try {
    const { name, email, comment, forwardToWebTeam } = publicCommentData;
    const msg = {
      to: laCityEmail,
      cc: forwardToWebTeam ? webTeamEmail : "",
      from: senderEmail,
      subject: `TDM_Calc Comment - ${name}`,
      text: `TDM_Calc Comment - ${name}`,
      html: ` <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email</strong>: ${email ? email : "Anonymous"}</p>
              <p><strong>Comment</strong>: ${comment}</p>
              <p><strong>Forward To Website Team</strong>: ${
                forwardToWebTeam ? "Yes" : "No"
              } </p>`
    };
    return sgMail.send(msg, false, err => {
      if (err) {
        return Promise.reject(
          "Sending email to LA City or Website team failed."
        );
      } else {
        return Promise.resolve(true);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  send,
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
  sendPublicComment
};
