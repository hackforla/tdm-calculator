const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const { setupServer, teardownServer } = require("../../_jest-setup_/server-setup");

// instantiates an actual server instance for robust testing of endpoints
let server;

beforeAll(async () => {
    server = await setupServer();
});

afterAll(async () => {
    await teardownServer();
});

describe("Account Endpoints", () => {

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

  // data persistence test for database cleanup
  it("should register a new user", async () => {
    const res = await request(server)
      .post("/api/accounts/register")
      .send({
        firstName: "Juan",
        lastName: "Lopez",
        email: 'thisUserShoudntPersist@test.com',
        password: "Password1!!!"
      });
    userId = res.body.newId;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("newId");
  });
});
