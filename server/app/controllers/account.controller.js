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
const { json } = require("express");

const getAll = async (req, res) => {
  try {
    const response = await accountService.selectAll();
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

// const getById = async (req, res) => {
//   try {
//     const { id } = Number(req.params);
//     const user = req.user;
//     // Only allow if request is for account info of current user
//     // or current user is Admin or SecurityAdmin
//     if (id !== user.id && !user.isAdmin && !user.isSecurityAdmin) {
//       res.sendStatus("401");
//     } else {
//       const response = await accountService.selectById(id);
//       res.send(response);
//     }
//   } catch (err) {
//     res.status("500").json({ error: err.toString() });
//   }
// };

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

const archiveById = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.id;
    // check that the user is not attempting to self-archive
    if (id == loggedInUserId) {
      return res.status(400).json({
        isSuccess: false,
        code: "ARCHIVE_SELF_NOT_ALLOWED",
        message: "Cannot archive self."
      });
    }
    const response = await accountService.archiveUser(id);
    if (response.isSuccess) {
      res.sendStatus(200);
    } else {
      res.status(response.code).json(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};


const unarchiveById = async(req, res) => {
  try {
    const { id } = req.params;
    const {loggedInUserId} = req.user;
    const response = await accountService.unarchiveUser(id, loggedInUserId)
    if (response.isSuccess) {
      res.sendStatus(200);
    } else {
      res.status(response.code).json(response);
    }
  } catch (err){
    res.status(500).send(err)
  }
}

const getAllArchivedUsers = async (req, res) => {
  try {
    const response = await accountService.getAllArchivedUsers();
    res.send(response);
  } catch (err) {
    res.send(500).send(err);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.id;
    // check that the user is not attempting to self-delete
    if (id == loggedInUserId) {
      return res.status(400).json({
        isSuccess: false,
        code: "DELETE_SELF_NOT_ALLOWED",
        message: "Cannot delete self."
      });
    }
    const response = await accountService.deleteUser(id);
    if (response.isSuccess) {
      res.sendStatus(200);
    } else {
      res.status(response.code).json(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  getAll,
  // getById,
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
  archiveById,
  unarchiveById,
  getAllArchivedUsers,
  deleteById,
};
