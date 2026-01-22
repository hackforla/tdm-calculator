const nodemailer = require("nodemailer");

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpAuthUser = process.env.SMTP_AUTH_USER;
const smtpAuthPass = process.env.SMTP_AUTH_PASS;

let transporter = nodemailer.createTransport({
  // service: "Gmail"
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure // true
});

// If Google Workspace SMTP Relay is configured to accept requests
// from a specific IP address, you don't want to include the auth
// user/pass. However, if you are using auth, then you need these credentials.
if (smtpAuthPass) {
  transporter.auth = {
    user: smtpAuthUser,
    pass: smtpAuthPass
  };
}

/* 
    msg object should have to, subject, text, html fields
*/
// Helper to extract the domain from an email address, works for "foo@domain" and "Name <foo@domain>"
function extractDomain(address) {
  if (!address) return "";
  // Remove display name if present
  const match = address.match(/<?([A-Z0-9._%+-]+)@([A-Z0-9.-]+\.[A-Z]{2,})>?/i);
  if (match) {
    return match[2].toLowerCase();
  }
  return "";
}

const send = async msg => {
  let mailOptions = {
    ...msg,
    from: `TDM Calculator <${smtpAuthUser}>`
  };

  try {
    // For Web API unit tests, we do not want to actually send emails
    // The endpoint test will use an email address ending in "test.com",
    // ao qw don't want to actually send those.
    const toDomain = extractDomain(mailOptions.to);
    const fromDomain = extractDomain(mailOptions.from);
    if (toDomain === "test.com" || fromDomain === "test.com") {
      return "Test email - not sent";
    }
    const info = await transporter.sendMail(mailOptions);
    const msg = `Message sent: ${info.messageId}`;
    console.log(msg);
    return msg;
  } catch (err) {
    console.error("Error sending email: %s", err.message);
    throw err;
  }
};

module.exports = {
  send
};
