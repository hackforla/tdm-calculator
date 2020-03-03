const sgMail = require("@sendgrid/mail");
const clientUrl = process.env.CLIENT_URL;
const emailUser = process.env.EMAIL_USER;
const sendgridKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridKey);

const sendRegistrationConfirmation = async (email, token) => {
  const msg = {
    to: `${email}`,
    from: emailUser,
    subject: "Verify your account",
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
    from: emailUser,
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

module.exports = {
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation
};
