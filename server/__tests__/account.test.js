const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");

let server;

beforeAll(async () => {
  server = await setupServer();
});

afterAll(async () => {
  await teardownServer();
});

describe("Account API endpoints for end user accounts", () => {
  let originalSendgrid = sgMail.send;
  // eslint-disable-next-line no-unused-vars
  let userId; // id of the registered user - to be deleted by security admin
  let capturedToken; // confirmation token captured from the mocked sendgrid function
  let userToken; // jwt for registered user - for protected endpoints

  beforeAll(async () => {
    sgMail.send = jest.fn(async () => {
      return { statusCode: 202 };
    });

    const registerResponse = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: "josegarcia@test.com",
        password: "Password1!!!"
      });
    userId = registerResponse.body.newId;

    await request(server).post("/api/accounts/register").send({
      firstName: "John",
      lastName: "Garcia",
      email: "JohnGarcia@test.com", // this email used in /resendConfirmationEmail test below
      password: "Password1!!!"
    });

    await request(server).post("/api/accounts/resendConfirmationEmail").send({
      email: "josegarcia@test.com"
    });
    // captures the token from the mocked sendgird function to be used in registration confirmation
    const tokenPattern = /\/confirm\/([a-zA-Z0-9-]+)/;
    const emailContent = sgMail.send.mock.calls[0][0].html;
    const match = emailContent.match(tokenPattern);
    if (match && match[1]) {
      capturedToken = match[1];
    }

    await request(server)
      .post("/api/accounts/confirmRegister")
      .send({ token: capturedToken });

    const loginResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: "josegarcia@test.com",
        password: "Password1!!!"
      });
    userToken = loginResponse.body.token;
  });

  afterAll(async () => {
    // cleanup state
    sgMail.send = originalSendgrid;
    userId = undefined;
    capturedToken = undefined;
    userToken = undefined;
  });

  // POST "/register" Register a new account
  it("should register a new user", async () => {
    const res = await request(server).post("/api/accounts/register").send({
      firstName: "Joseph",
      lastName: "Smith",
      email: "josephSmith@test.com",
      password: "Password1!!!"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("newId");
  });

  // POST "/register" attempt to register a user with an existing email
  it("should not register a new user with an existing email", async () => {
    const res = await request(server).post("/api/accounts/register").send({
      firstName: "Jose",
      lastName: "Garcia",
      email: "josegarcia@test.com",
      password: "Password1!!!"
    });
    // expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", "REG_DUPLICATE_EMAIL");
  });

  // POST "/resendConfirmationEmail" Resend confirmation email
  it("should resend a confirmation email", async () => {
    const res = await request(server)
      .post("/api/accounts/resendConfirmationEmail")
      .send({
        email: "JohnGarcia@test.com"
      });
    expect(res.statusCode).toEqual(200);
  });

  // POST "/confirmRegister" Confirm registration
  it("should confirm a user's registration", async () => {
    // uses the captured token from the mocked sendgrid function above
    const res = await request(server)
      .post("/api/accounts/confirmRegister")
      .send({ token: capturedToken });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
  });

  // POST "/login" attempt to login with an incorrect password
  it("should not login as a user with an incorrect password", async () => {
    const res = await request(server).post("/api/accounts/login").send({
      email: "josegarcia@test.com",
      password: "WrongPassword1!!!"
    });
    // expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", "AUTH_INCORRECT_PASSWORD");
  });

  // POST "/login" attempt to login user without account
  it("should not login as a user without an account", async () => {
    const res = await request(server).post("/api/accounts/login").send({
      email: "fakeUser@test.com",
      password: "fakePasswprd1!!!"
    });
    // expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", "AUTH_NO_ACCOUNT");
  });

  // POST "/login" Login as a user
  it("should login as a user", async () => {
    const res = await request(server).post("/api/accounts/login").send({
      email: "josegarcia@test.com",
      password: "Password1!!!"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // GET "/" Get all accounts attempt as a regular user(Security Admin only)
  it("should NOT get all accounts while logged in as regular user", async () => {
    const res = await request(server)
      .get("/api/accounts")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(403);
  });

  // POST "/forgotPassword" Forgot password
  it("should send a forgot password email", async () => {
    const res = await request(server)
      .post("/api/accounts/forgotPassword")
      .send({
        email: "josegarcia@test.com"
      });
    expect(res.statusCode).toEqual(200);
  });

  // POST "/resetPassword" Reset password
  it("should reset a password", async () => {
    const res = await request(server)
      .post("/api/accounts/resetPassword")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        password: "NewPassword1!!!",
        token: userToken
      });
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/updateaccount" Update account
  it("should update a user", async () => {
    const res = await request(server)
      .put(`/api/accounts/updateaccount`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: "newEmail@test.com"
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe("Account API endpoints for security admin", () => {
  let originalSendgrid = sgMail.send;
  let newUserId; // id of the registered user - to be deleted by security admin
  let archUserId; // id of the archived user - to be unarchived by security admin
  let adminToken; // jwt for security admin - for protected endpoints
  let capturedToken; // confirmation token captured from the mocked sendgrid function
  let archiveUserWithSubId; // id of the archived user with submission

  beforeAll(async () => {
    sgMail.send = jest.fn(async () => {
      return { statusCode: 202 };
    });

    // login as security admin
    const adminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.SECURITY_ADMIN_EMAIL,
        password: process.env.SECURITY_ADMIN_PASSWORD
      });
    adminToken = adminTokenResponse.body.token;

    const userIdResponse = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Alex",
        lastName: "Johnson",
        email: "AlexJohnson@test.com",
        password: "Password1!!!"
      });
    newUserId = userIdResponse.body.newId;

    await request(server).post("/api/accounts/resendConfirmationEmail").send({
      email: "AlexJohnson@test.com"
    });
    // captures the token from the mocked sendgird function to be used in registration confirmation
    const tokenPattern = /\/confirm\/([a-zA-Z0-9-]+)/;
    const emailContent = sgMail.send.mock.calls[0][0].html;
    const match = emailContent.match(tokenPattern);
    if (match && match[1]) {
      capturedToken = match[1];
    }

    await request(server)
      .post("/api/accounts/confirmRegister")
      .send({ token: capturedToken });

    const archiveUserResponse = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Bo",
        lastName: "Haase",
        email: "BoHaase@test.com",
        password: "Password1!!!"
      });
    archUserId = archiveUserResponse.body.newId;

    await request(server)
      .put(`/api/accounts/${archUserId}/archiveaccount`)
      .set("Authorization", `Bearer ${adminToken}`);

    const archiveUserWithSubmission = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Luka",
        lastName: "Doncic",
        email: "LukaDoncic@test.com",
        password: "Password1!!!"
      });
    archiveUserWithSubId = archiveUserWithSubmission.body.newId;

    await request(server).post("/api/accounts/resendConfirmationEmail").send({
      email: "LukaDoncic@test.com"
    });

    const reUseEmailConfirmation =
      sgMail.send.mock.calls[sgMail.send.mock.calls.length - 1];

    const lukaEmailContent = reUseEmailConfirmation[0].html;
    const lukaMatch = lukaEmailContent.match(tokenPattern);
    if (lukaMatch && lukaMatch[1]) {
      await request(server)
        .post("/api/accounts/confirmRegister")
        .send({ token: lukaMatch[1] });
    }
    // Login to test user
    const userLoginRespose = await request(server)
      .post("/api/accounts/login")
      .send({
        email: "LukaDoncic@test.com",
        password: "Password1!!!"
      });
    const userToken = userLoginRespose.body.token;

    // create project with test user
    const projectResponse = await request(server)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Test Project",
        address: "123 Main St.",
        description: "Test Project",
        formInputs: '{"PROJECT_NAME":"Test Project"}',
        loginId: archiveUserWithSubId,
        calculationId: 1
      });

    const projectId = projectResponse.body.id;
    // submit snapshot
    await request(server)
      .put("/api/projects/snapshot")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ id: projectId });

    // sumbit project to server as user
    await request(server)
      .put("/api/projects/submit")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ id: projectId });
  });

  afterAll(async () => {
    // cleanup state
    sgMail.send = originalSendgrid;
    newUserId = undefined;
    adminToken = undefined;
    capturedToken = undefined;
    archUserId = undefined;
    undefined;
  });

  // POST "/login/:email?" Login as security admin
  it("should login as a security admin", async () => {
    const res = await request(server).post("/api/accounts/login").send({
      email: process.env.SECURITY_ADMIN_EMAIL,
      password: process.env.SECURITY_ADMIN_PASSWORD
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // PUT "/:id/roles" Update roles for an account to give admin priviliges
  it("should grant admin role to another user while logged in as security admin", async () => {
    const res = await request(server)
      .put(`/api/accounts/${newUserId}/roles`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: newUserId,
        isAdmin: true,
        isSecurityAdmin: true
      });
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/:id/roles" Update roles for an account to revoke admin priviliges
  it("should revoke admin role to another user while logged in as security admin", async () => {
    const res = await request(server)
      .put(`/api/accounts/${newUserId}/roles`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: newUserId,
        isAdmin: false,
        isSecurityAdmin: false
      });
    expect(res.statusCode).toEqual(200);
  });

  // GET "/" Get all accounts (Security Admin only)
  it("should get all accounts while logged in as security admin", async () => {
    const res = await request(server)
      .get("/api/accounts")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/:id/archiveaccount" Archive account (Security Admin only)
  it("should archive a user", async () => {
    const res = await request(server)
      .put(`/api/accounts/${newUserId}/archiveaccount`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/:id/unarchiveaccount" Unarchive account (Security Admin only)
  it("should unarchive a user", async () => {
    const res = await request(server)
      .put(`/api/accounts/${archUserId}/unarchiveaccount`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  // GET "/archivedaccounts" Get all archived accounts (Security Admin only)
  it("should get all archived accounts while logged in as security admin", async () => {
    const res = await request(server)
      .get("/api/accounts/archivedaccounts")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  // DELETE "/:id/deleteaccount" Delete a user's account (Security Admin only)
  it("should delete a user", async () => {
    const res = await request(server)
      .delete(`/api/accounts/${newUserId}/deleteaccount`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  describe("deleteUser", () => {
    describe("Security Admin shouldn't delete an accout with submissions", () => {
      it("Return error, Cannot Delete Account With Submission", async () => {
        // archive the test user as archive account
        await request(server)
          .put(`/api/accounts/${archiveUserWithSubId}/archiveaccount`)
          .set("Authorization", `Bearer ${adminToken}`);

        // delete account as a security admin
        const res = await request(server)
          .delete(`/api/accounts/${archiveUserWithSubId}/deleteaccount`)
          .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(500);
        expect(res.text || res.body.message || res.body).toContain(
          "Cannot delete account with submissions. Account has projects that have been submitted."
        );
      });
    });
  });
});
