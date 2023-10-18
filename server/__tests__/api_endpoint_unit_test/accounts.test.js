const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const app = require("../../server");

require("dotenv").config();

let originalSendgrid = sgMail.send;

beforeEach(() => {
  // Mock the send function
  sgMail.send = jest.fn(async (msg) => {
    return {statusCode: 202};
  });
});

afterEach(() => {
  // Restore the original function after each test
  sgMail.send = originalSendgrid;
});

describe("Account Endpoints", () => {
  let userId; // id of the registered user - to be deleted by security admin
  let adminToken; // jwt for security admin - for protected endpoints

  // GET "/" Get all accounts (Security Admin only)

  // PUT "/:id/roles" Update roles for an account (Security Admin only)

  // // POST "/register" Register a new account
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/accounts/register")
      .send({
        firstName: "Jose",
        lastName: "Garcia",
        email: `'josegarcia@test.com'`,
        password: "Password1!!!"
      });
    // console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("newId");
    userId = res.body.newId;
  });

  // POST "/resendConfirmationEmail" Resend confirmation email

  // POST "/confirmRegister" Confirm registration

  // POST "/forgotPassword" Forgot password

  // POST "/resetPassword" Reset password

  // POST "/login/:email?" Login
  it("should login as a security admin", async () => {
    const res = await request(app).post("/api/accounts/login").send({
      email: process.env.SECURITY_ADMIN_EMAIL,
      password: process.env.SECURITY_ADMIN_PASSWORD
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    adminToken = res.body.token;
    // console.log(adminToken);
  });

  // GET "/logout" Logout

  // PUT "/:id/updateaccount" Update account

  // PUT "/:id/archiveaccount" Archive account (Security Admin only)

  // PUT "/:id/unarchiveaccount" Unarchive account (Security Admin only)

  // GET "/archivedaccounts" Get all archived accounts (Security Admin only)

  // DELETE "/:id/deleteaccount" Delete account (Security Admin only)
  it("should delete a user", async () => {
    const res = await request(app)
      .delete(`/api/accounts/${userId}/deleteaccount`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
