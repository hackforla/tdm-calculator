const accountService = require("../services/account.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const accountSchema = require("../schemas/account");
const accountRegisterSchema = require("../schemas/account.register");
const accountUpdateAccountSchema = require("../schemas/account.updateAccount");
const accountConfirmRegisterSchema = require("../schemas/account.confirmRegister");
const accountLoginSchema = require("../schemas/account.login");
const accountForgotSchema = require("../schemas/account.forgotPassword");
const accountResetSchema = require("../schemas/account.reset");
const accountRoleSchema = require("../schemas/account.role");
const accountConfirmEmail = require("../schemas/account.confirmEmail");

const getAll = async (req, res) => {
  try {
    const response = await accountService.selectAll();
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.selectById(id);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const getByEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.selectByEmail(id);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const register = async (req, res) => {
  try {
    const response = await accountService.register(req.body);
    res.send(response);
  } catch (err) {
    res.status(err.code || "500").json({ error: err.toString() });
  }
};

const updateAccount = async (req, res) => {
  try {
    const response = await accountService.updateAccount(req.body);
    res.send(response);
  } catch (err) {
    res.status(err.code || "500").json({ error: err.toString() });
  }
};

const resendConfirmationEmail = async (req, res) => {
  try {
    const response = await accountService.resendConfirmationEmail(
      req.body.email
    );
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const response = await accountService.forgotPassword(req.body);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await accountService.resetPassword(req.body);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const confirmRegister = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.body.id) {
      res.status("400");
    }
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const resp = await accountService.authenticate(email, password);
    if (resp.isSuccess) {
      req.user = resp.user;
      next();
    } else {
      res.json(resp);
    }
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const put = async (req, res) => {
  try {
    await accountService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const putRoles = async (req, res) => {
  try {
    await accountService.updateRoles(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await accountService.remove(id);
    res.sendStatus(200);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  register: [
    validate({ body: accountRegisterSchema }),
    register,
    validationErrorMiddleware
  ],
  updateAccount: [
    validate({ body: accountUpdateAccountSchema }),
    updateAccount,
    validationErrorMiddleware
  ],
  confirmRegister: [
    validate({ body: accountConfirmRegisterSchema }),
    confirmRegister,
    validationErrorMiddleware
  ],
  resendConfirmationEmail: [
    validate({ body: accountConfirmEmail }),
    resendConfirmationEmail,
    validationErrorMiddleware
  ],
  forgotPassword: [
    validate({ body: accountForgotSchema }),
    forgotPassword,
    validationErrorMiddleware
  ],
  resetPassword: [
    validate({ body: accountResetSchema }),
    resetPassword,
    validationErrorMiddleware
  ],
  login: [
    validate({ body: accountLoginSchema }),
    login,
    validationErrorMiddleware
  ],
  put: [validate({ body: accountSchema }), put, validationErrorMiddleware],
  putRoles: [
    validate({ body: accountRoleSchema }),
    putRoles,
    validationErrorMiddleware
  ],
  remove
};
