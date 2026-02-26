const smtpService = require("../services/smtp.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const emailSchema = require("../schemas/email");

const send = async (req, res) => {
  // const { to, subject, text, html } = req.body;
  try {
    await smtpService.send(req.body);
    res.sendStatus(202);
  } catch (err) {
    res.status("404").json({ error: err.toString() });
  }
};

module.exports = {
  send: [validate({ body: emailSchema }), send, validationErrorMiddleware]
};
