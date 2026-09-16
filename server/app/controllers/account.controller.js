const accountService = require("../services/account.service");
const angelenoAuthService = require("../services/angeleno-auth.service");
const googleAuthService = require("../services/google-auth.service");
const jwtSession = require("../../middleware/jwt-session");
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
    res.status(500).json({ error: err.toString() });
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
//     res.status(500).json({ error: err.toString() });
//   }
// };

const getByEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.selectByEmail(id);
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const register = async (req, res) => {
  try {
    const response = await accountService.register(req.body);
    res.send(response);
  } catch (err) {
    res.status(err.code || 500).json({ error: err.toString() });
  }
};

const updateAccount = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const updatedFields = { ...req.body, id: loggedInUser };
    const response = await accountService.updateAccount(updatedFields);
    res.send(response);
  } catch (err) {
    res.status(err.code || 500).json({ error: err.toString() });
  }
};

const resendConfirmationEmail = async (req, res) => {
  try {
    const response = await accountService.resendConfirmationEmail(
      req.body.email
    );
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const response = await accountService.forgotPassword(req.body);
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await accountService.resetPassword(req.body);
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const confirmRegister = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.body.id) {
      res.status(401);
    }
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const resp = await accountService.authenticate(email, password);
    if (resp.isSuccess) {
      req.user = resp.user;

      await accountService.addLastLoginDate(req.user.id);
      next();
    } else {
      res.json(resp);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const getSession = async (req, res) => {
  res.json({ isSuccess: true, user: req.user });
};

const escapeHtml = value =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderDemoAccountOptions = profiles =>
  profiles
    .map((profile, index) => {
      const subject = escapeHtml(profile.externalSubject);
      const email = escapeHtml(profile.email);
      const name = escapeHtml(`${profile.firstName} ${profile.lastName}`);
      const checked = index === 0 ? " checked" : "";

      return `<label class="account-option">
        <input type="radio" name="subject" value="${subject}"${checked} />
        <span>
          <strong>${email}</strong>
          <small>${name}</small>
        </span>
      </label>`;
    })
    .join("");

const redirectToCompletedAngelenoLogin = (res, redirectPath) => {
  const nextPath = encodeURIComponent(redirectPath || "/calculation/1/0");
  res.redirect(
    `${process.env.CLIENT_URL}/login?angeleno=success&next=${nextPath}`
  );
};

const redirectToCompletedGoogleLogin = (res, redirectPath) => {
  const nextPath = encodeURIComponent(redirectPath || "/calculation/1/0");
  res.redirect(
    `${process.env.CLIENT_URL}/login?google=success&next=${nextPath}`
  );
};

const angelenoLogin = async (req, res) => {
  try {
    if (angelenoAuthService.isDemoMode()) {
      const { authorizationUrl, state } =
        angelenoAuthService.createDemoLoginRequest(req.query.redirect);

      res.cookie(
        "angeleno_oauth_state",
        angelenoAuthService.encodeStateCookie(state),
        {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
          sameSite: "lax"
        }
      );
      res.redirect(authorizationUrl);
      return;
    }

    const { authorizationUrl, state } =
      await angelenoAuthService.createLoginRequest(req.query.redirect);

    res.cookie(
      "angeleno_oauth_state",
      angelenoAuthService.encodeStateCookie(state),
      {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        sameSite: "lax"
      }
    );
    res.redirect(authorizationUrl);
  } catch (err) {
    if (err.code === "ANGELENO_NOT_CONFIGURED") {
      res.status(503).json({
        isSuccess: false,
        code: err.code,
        message: err.message
      });
      return;
    }
    res.status(500).json({ error: err.toString() });
  }
};

const renderAngelenoDemoPage = ({
  state,
  errorMessage = "",
  username = ""
}) => {
  const profiles = angelenoAuthService.getDemoUserProfiles();
  const demoPassword = escapeHtml(angelenoAuthService.getDemoPassword());
  const demoUsernames = profiles
    .map(profile => `<li><code>${escapeHtml(profile.email)}</code></li>`)
    .join("");
  const errorHtml = errorMessage
    ? `<div class="error-message" role="alert">${escapeHtml(errorMessage)}</div>`
    : "";
  const usernameValue = escapeHtml(username);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Angeleno Account Demo Sign In</title>
  <style>
    body {
      background: #f4f7fb;
      color: #1f2933;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
    }
    main {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 14px 40px rgba(15, 41, 64, 0.18);
      max-width: 420px;
      padding: 32px;
      width: calc(100% - 48px);
    }
    .brand {
      color: #0f2940;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .tagline {
      color: #4b5563;
      margin-bottom: 28px;
    }
    .error-message {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 6px;
      color: #b91c1c;
      font-size: 14px;
      margin-bottom: 20px;
      padding: 12px;
    }
    .account {
      background: #eef5ff;
      border: 1px solid #c9ddf8;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .account legend {
      color: #5b6777;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .account-option {
      align-items: flex-start;
      cursor: pointer;
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }
    .account-option:last-child {
      margin-bottom: 0;
    }
    .account-option input {
      margin-top: 2px;
    }
    .account-option small {
      color: #5b6777;
      display: block;
      margin-top: 2px;
    }
    .credential-field {
      display: block;
      margin-bottom: 14px;
    }
    .credential-field label {
      color: #5b6777;
      display: block;
      font-size: 13px;
      margin-bottom: 6px;
    }
    .credential-field input {
      border: 1px solid #c9d3df;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 16px;
      padding: 10px 12px;
      width: 100%;
    }
    .demo-credentials {
      color: #4b5563;
      font-size: 13px;
      line-height: 1.5;
      margin: 0 0 24px;
    }
    .demo-credentials code {
      color: #0f2940;
    }
    .label {
      color: #5b6777;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .email {
      font-weight: 700;
    }
    .permissions {
      border-top: 1px solid #e5e7eb;
      margin: 24px 0;
      padding-top: 20px;
    }
    .permissions ul {
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 0;
      padding-left: 20px;
    }
    .actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    a, button {
      border-radius: 6px;
      font-size: 16px;
      padding: 10px 16px;
      text-decoration: none;
    }
    a {
      color: #0f2940;
    }
    button {
      background: #0f66bd;
      border: 0;
      color: #fff;
      cursor: pointer;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <div class="brand">Angeleno Account</div>
    <div class="tagline">Demo unified sign-in experience for City services.</div>
    ${errorHtml}
    <form method="post" action="/api/accounts/angeleno/demo/continue">
      <input type="hidden" name="state" value="${escapeHtml(state)}" />
      <fieldset class="account">
        <legend>Sign in with your Angeleno Account</legend>
        <div class="credential-field">
          <label for="username">Username or email</label>
          <input id="username" name="username" type="email" autocomplete="username" required autofocus value="${usernameValue}" />
        </div>
        <div class="credential-field">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required />
        </div>
      </fieldset>
      <div class="demo-credentials">
        <div>Demo usernames:</div>
        <ul>${demoUsernames}</ul>
        <div>Demo password: <code>${demoPassword}</code></div>
      </div>
      <div class="permissions">
        <div class="label">TDM Calculator is requesting access to:</div>
        <ul>
          <li>Confirm your Angeleno Account sign-in</li>
          <li>Read your basic profile</li>
          <li>Read your email address</li>
        </ul>
      </div>
      <div class="actions">
        <a href="${process.env.CLIENT_URL}/login">Cancel</a>
        <button type="submit">Continue to TDM Calculator</button>
      </div>
    </form>
  </main>
</body>
</html>`;
};

const angelenoDemo = async (req, res) => {
  const stateCookie = angelenoAuthService.decodeStateCookie(
    req.cookies.angeleno_oauth_state
  );

  if (!angelenoAuthService.isDemoMode()) {
    res.status(404).send("Not found");
    return;
  }
  if (!stateCookie || stateCookie.state !== req.query.state) {
    res.status(401).send("Invalid Angeleno demo state");
    return;
  }

  res.type("html").send(renderAngelenoDemoPage({ state: stateCookie.state }));
};

const angelenoDemoContinue = async (req, res) => {
  const stateCookie = angelenoAuthService.decodeStateCookie(
    req.cookies.angeleno_oauth_state
  );

  try {
    if (!angelenoAuthService.isDemoMode()) {
      res.status(404).send("Not found");
      return;
    }
    if (!stateCookie || stateCookie.state !== req.body.state) {
      res.status(401).send("Invalid Angeleno demo state");
      return;
    }

    const profile = angelenoAuthService.authenticateDemoCredentials(
      req.body.username,
      req.body.password
    );
    if (!profile) {
      res
        .type("html")
        .status(200)
        .send(
          renderAngelenoDemoPage({
            state: stateCookie.state,
            errorMessage: "Incorrect username or password. Please try again.",
            username: req.body.username
          })
        );
      return;
    }

    const code = angelenoAuthService.createDemoAuthorizationCode(
      stateCookie.state,
      profile.externalSubject
    );
    res.redirect(
      `/api/accounts/angeleno/callback?code=${code}&state=${stateCookie.state}`
    );
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const googleLogin = async (req, res) => {
  try {
    if (googleAuthService.isDemoMode()) {
      const { authorizationUrl, state } =
        googleAuthService.createDemoLoginRequest(req.query.redirect);

      res.cookie(
        "google_oauth_state",
        googleAuthService.encodeStateCookie(state),
        {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
          sameSite: "lax"
        }
      );
      res.redirect(authorizationUrl);
      return;
    }

    const { authorizationUrl, state } =
      await googleAuthService.createLoginRequest(req.query.redirect);

    res.cookie(
      "google_oauth_state",
      googleAuthService.encodeStateCookie(state),
      {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        sameSite: "lax"
      }
    );
    res.redirect(authorizationUrl);
  } catch (err) {
    if (err.code === "GOOGLE_SSO_NOT_CONFIGURED") {
      res.status(503).json({
        isSuccess: false,
        code: err.code,
        message: err.message
      });
      return;
    }
    res.status(500).json({ error: err.toString() });
  }
};

const googleDemo = async (req, res) => {
  const stateCookie = googleAuthService.decodeStateCookie(
    req.cookies.google_oauth_state
  );

  if (!googleAuthService.isDemoMode()) {
    res.status(404).send("Not found");
    return;
  }
  if (!stateCookie || stateCookie.state !== req.query.state) {
    res.status(401).send("Invalid Google demo state");
    return;
  }

  const profiles = googleAuthService.getDemoUserProfiles();
  res.type("html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Google SSO Demo Sign In</title>
  <style>
    body {
      background: #f8fafd;
      color: #202124;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
    }
    main {
      background: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      max-width: 450px;
      padding: 36px;
      width: calc(100% - 48px);
    }
    .brand {
      color: #202124;
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .google {
      color: #4285f4;
      font-weight: 700;
    }
    .tagline {
      color: #5f6368;
      margin-bottom: 28px;
    }
    .account {
      border: 1px solid #dadce0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .account legend {
      color: #5f6368;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .account-option {
      align-items: flex-start;
      cursor: pointer;
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }
    .account-option:last-child {
      margin-bottom: 0;
    }
    .account-option input {
      margin-top: 2px;
    }
    .account-option small {
      color: #5f6368;
      display: block;
      margin-top: 2px;
    }
    .label {
      color: #5f6368;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .email {
      font-weight: 700;
    }
    .permissions {
      border-top: 1px solid #e8eaed;
      margin: 24px 0;
      padding-top: 20px;
    }
    .permissions ul {
      color: #3c4043;
      line-height: 1.6;
      margin-bottom: 0;
      padding-left: 20px;
    }
    .actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    a, button {
      border-radius: 4px;
      font-size: 15px;
      padding: 10px 16px;
      text-decoration: none;
    }
    a {
      color: #1a73e8;
    }
    button {
      background: #1a73e8;
      border: 0;
      color: #fff;
      cursor: pointer;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <div class="brand"><span class="google">Google</span> Sign-In</div>
    <div class="tagline">Demo internal SSO experience for City staff.</div>
    <form method="post" action="/api/accounts/google/demo/continue">
      <input type="hidden" name="state" value="${stateCookie.state}" />
      <fieldset class="account">
        <legend>Choose a Google account</legend>
        ${renderDemoAccountOptions(profiles)}
      </fieldset>
      <div class="permissions">
        <div class="label">TDM Calculator is requesting access to:</div>
        <ul>
          <li>Confirm your Google SSO sign-in</li>
          <li>Read your basic profile</li>
          <li>Read your City email address</li>
        </ul>
      </div>
      <div class="actions">
        <a href="${process.env.CLIENT_URL}/login">Cancel</a>
        <button type="submit">Continue to TDM Calculator</button>
      </div>
    </form>
  </main>
</body>
</html>`);
};

const googleDemoContinue = async (req, res) => {
  const stateCookie = googleAuthService.decodeStateCookie(
    req.cookies.google_oauth_state
  );

  try {
    if (!googleAuthService.isDemoMode()) {
      res.status(404).send("Not found");
      return;
    }
    if (!stateCookie || stateCookie.state !== req.body.state) {
      res.status(401).send("Invalid Google demo state");
      return;
    }

    const code = googleAuthService.createDemoAuthorizationCode(
      stateCookie.state,
      req.body.subject
    );
    res.redirect(
      `/api/accounts/google/callback?code=${code}&state=${stateCookie.state}`
    );
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const googleCallback = async (req, res) => {
  const stateCookie = googleAuthService.decodeStateCookie(
    req.cookies.google_oauth_state
  );
  res.clearCookie("google_oauth_state", { httpOnly: true });

  try {
    if (!stateCookie || stateCookie.state !== req.query.state) {
      res.status(401).send("Invalid Google sign-in state");
      return;
    }
    if (!req.query.code) {
      res.status(400).send("Missing Google authorization code");
      return;
    }

    let profile;
    if (googleAuthService.isDemoMode()) {
      const tokenResponse = googleAuthService.exchangeDemoCode(
        req.query.code,
        stateCookie.state
      );
      profile = googleAuthService.getDemoAccountInfo(
        tokenResponse.access_token
      );
    } else {
      const tokenResponse = await googleAuthService.exchangeCode(
        req.query.code
      );
      const claims = await googleAuthService.verifyIdToken(
        tokenResponse.id_token,
        stateCookie.nonce
      );
      profile = googleAuthService.getUserProfile(claims);
    }

    const authResult = await accountService.authenticateExternal(profile);
    if (!authResult.isSuccess) {
      res.status(403).json(authResult);
      return;
    }

    await jwtSession.createSession(res, authResult.user);
    redirectToCompletedGoogleLogin(res, stateCookie.redirectPath);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const angelenoCallback = async (req, res) => {
  const stateCookie = angelenoAuthService.decodeStateCookie(
    req.cookies.angeleno_oauth_state
  );
  res.clearCookie("angeleno_oauth_state", { httpOnly: true });

  try {
    if (!stateCookie || stateCookie.state !== req.query.state) {
      res.status(401).send("Invalid Angeleno sign-in state");
      return;
    }
    if (!req.query.code) {
      res.status(400).send("Missing Angeleno authorization code");
      return;
    }

    if (angelenoAuthService.isDemoMode()) {
      const tokenResponse = angelenoAuthService.exchangeDemoCode(
        req.query.code,
        stateCookie.state
      );
      const profile = angelenoAuthService.getDemoAccountInfo(
        tokenResponse.access_token
      );
      const authResult = await accountService.authenticateExternal(profile);

      if (!authResult.isSuccess) {
        res.status(403).json(authResult);
        return;
      }

      await jwtSession.createSession(res, authResult.user);
      redirectToCompletedAngelenoLogin(res, stateCookie.redirectPath);
      return;
    }

    const tokenResponse = await angelenoAuthService.exchangeCode(
      req.query.code
    );
    const claims = await angelenoAuthService.verifyIdToken(
      tokenResponse.id_token,
      stateCookie.nonce
    );
    const profile = angelenoAuthService.getUserProfile(claims);
    const authResult = await accountService.authenticateExternal(profile);

    if (!authResult.isSuccess) {
      res.status(403).json(authResult);
      return;
    }

    await jwtSession.createSession(res, authResult.user);
    redirectToCompletedAngelenoLogin(res, stateCookie.redirectPath);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const put = async (req, res) => {
  try {
    await accountService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
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

const unarchiveById = async (req, res) => {
  try {
    const { id } = req.params;
    const { loggedInUserId } = req.user;
    const response = await accountService.unarchiveUser(id, loggedInUserId);
    if (response.isSuccess) {
      res.sendStatus(200);
    } else {
      res.status(response.code).json(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllArchivedUsers = async (req, res) => {
  try {
    const response = await accountService.getAllArchivedUsers();
    res.send(response);
  } catch (err) {
    res.send(500).send(err);
  }
};

const getAllDROUsers = async (req, res) => {
  try {
    const response = await accountService.getAllDROfficeUsers();
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

const cleanupInactive = async (req, res) => {
  try {
    const response = await accountService.cleanupInactive();
    res.send(response);
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
  getSession,
  angelenoLogin,
  angelenoDemo,
  angelenoDemoContinue,
  angelenoCallback,
  googleLogin,
  googleDemo,
  googleDemoContinue,
  googleCallback,
  put: [validate({ body: accountSchema }), put, validationErrorMiddleware],
  putRoles: [
    validate({ body: accountRoleSchema }),
    putRoles,
    validationErrorMiddleware
  ],
  archiveById,
  unarchiveById,
  getAllArchivedUsers,
  getAllDROUsers,
  deleteById,
  cleanupInactive
};
