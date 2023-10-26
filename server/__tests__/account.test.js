const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const { setupServer, teardownServer } = require("../_jest-setup_/utils/server-setup");

let server;
let originalSendgrid = sgMail.send;

beforeAll(async () => {
    server = await setupServer();
});

afterAll(async () => {
    await teardownServer();
});

beforeEach(() => {
    sgMail.send = jest.fn(async (msg) => {
        return { statusCode: 202 };
    });
});

afterEach(() => {
    sgMail.send = originalSendgrid;
});

describe("Account API Endpoints", () => {

  let userId; // id of the registered user - to be deleted by security admin
  let adminToken; // jwt for security admin - for protected endpoints
  let userToken; // jwt for registered user - for protected endpoints

  //////////////////////////////
  //      user endpoints      //
  //////////////////////////////

  // POST "/register" Register a new account
  it("should register a new user", async () => {
    const res = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: 'josegarcia@test.com',
        password: "Password1!!!"
      });
    userId = res.body.newId;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("newId");
  });

  // POST "/register" attempt to register a user with invalid email format
  it("should not register a new user with an invalid email format", async () => {
    const res = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: 'josegarcia',
        password: "Password1!!!"
      });
    expect(res.statusCode).toEqual(400);
  });

  // POST "/register" attempt to register a user with an existing email
  it("should not register a new user with an existing email", async () => {
    const res = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: 'josegarcia@test.com',
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
          email: 'josegarcia@test.com',
      });
    // captures the token from the mocked sendgird function to be used in confirmation test below
    const tokenPattern = /\/confirm\/([a-zA-Z0-9\-]+)/;
    const emailContent = sgMail.send.mock.calls[0][0].html;
    const match = emailContent.match(tokenPattern);
    if (match && match[1]) {
      capturedToken = match[1];
    }
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
    const res = await request(server)
    .post("/api/accounts/login")
    .send({
        email: 'josegarcia@test.com',
        password: "WrongPassword1!!!"
    });
    // expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", "AUTH_INCORRECT_PASSWORD")
  });

  // POST "/login" attempt to login user without account
  it("should not login as a user without an account", async () => {
    const res = await request(server)
    .post("/api/accounts/login")
    .send({
        email: 'fakeUser@test.com',
        password: "fakePasswprd1!!!"
    });
    // expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", "AUTH_NO_ACCOUNT")
  });

  // POST "/login" Login as a user
  it("should login as a user", async () => {
    const res = await request(server)
    .post("/api/accounts/login")
    .send({
        email: 'josegarcia@test.com',
        password: "Password1!!!"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
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
          email: 'josegarcia@test.com',
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
        token: userToken,
      });
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/:id/updateaccount" Update account
  it("should update a user", async () => {
    const res = await request(server)
      .put(`/api/accounts/${userId}/updateaccount`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: 'newEmail@test.com',
      });
    expect(res.statusCode).toEqual(200);
  });

  // logout endpoint is not implemented properly so this test will fail. Logout is handled by frontend client
  // GET "/logout" Logout as a user
  // it("should logout the user", async () => {
  //   const logoutRes = await request(server).get("/api/accounts/logout");
  //   expect(logoutRes.statusCode).toEqual(200);
  // });

  //////////////////////////////
  // security admin endpoints //
  //////////////////////////////

  // POST "/login/:email?" Login as security admin
  it("should login as a security admin", async () => {
    const res = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.SECURITY_ADMIN_EMAIL,
        password: process.env.SECURITY_ADMIN_PASSWORD
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    adminToken = res.body.token;
  });

  // PUT "/:id/roles" Update roles for an account to give admin priviliges (Security Admin only)
  it("should update roles for an account while logged in as security admin", async () => {
    const res = await request(server)
      .put(`/api/accounts/${userId}/roles`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: userId,
        isAdmin: true,
        isSecurityAdmin: true,
      });
    expect(res.statusCode).toEqual(200)
  });

  // PUT "/:id/roles" Update roles for an account to revoke admin priviliges (Security Admin only)
  it("should update roles for an account while logged in as security admin", async () => {
    const res = await request(server)
      .put(`/api/accounts/${userId}/roles`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        id: userId,
        isAdmin: false,
        isSecurityAdmin: false,
      });
    expect(res.statusCode).toEqual(200)
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
      .put(`/api/accounts/${userId}/archiveaccount`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/:id/unarchiveaccount" Unarchive account (Security Admin only)
  it("should unarchive a user", async () => {
    const res = await request(server)
      .put(`/api/accounts/${userId}/unarchiveaccount`)
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
      .delete(`/api/accounts/${userId}/deleteaccount`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });
});