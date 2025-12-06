const smtpService = require("../services/smtp.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const emailSchema = require("../schemas/email");

const send = (req, res) => {
  // const { to, subject, text, html } = req.body;
  smtpService
    .send(req.body)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("404").json({ error: err.toString() });
    });
};

module.exports = {
  send: [validate({ body: emailSchema }), send, validationErrorMiddleware]
};
