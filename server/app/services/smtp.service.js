const nodemailer = require("nodemailer");

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpAuthUser = process.env.SMTP_AUTH_USER;
const smtpAuthPass = process.env.SMTP_AUTH_PASS;

let transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure, // true for 465, false for other ports
  auth: {
    user: smtpAuthUser,
    pass: smtpAuthPass
  }
});

/* 
    msg object should have to, subject, text, html fields
*/
const send = async msg => {
  let mailOptions = {
    ...msg,
    from: `TDM Calculator <${smtpAuthUser}>`
  };

  try {
    // For Web API unit tests, we do not want to actually send emails
    // The endpoint test will use an email address ending in "test.com",
    // ao qw don't want to actually send those.
    if (
      mailOptions.to.endsWith("test.com") ||
      mailOptions.from.endsWith("test.com")
    ) {
      return "Test email - not sent";
    }
    const info = await transporter.sendMail(mailOptions);
    const msg = `Message sent: ${info.messageId}`;
    console.log(msg);
    return msg;
  } catch (err) {
    console.error("Error sending email: %s", err.message);
  }
};

module.exports = {
  send
};
