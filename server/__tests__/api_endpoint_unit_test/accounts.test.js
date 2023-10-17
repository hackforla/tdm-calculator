const request = require("supertest");
// const app = require("../../server");
const { start, stop } = require("../../mssql-test-container");

require("dotenv").config();

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));
let server;
let app;

beforeAll(async () => {
    try {
        await start();
        app = require("../../server");

        // If your server doesn't start automatically upon import:
        const testPort = parseInt(process.env.TEST_PORT, 10) || 5002;
        server = app.listen(testPort, () => {
            console.log(`Test server started on port ${testPort}`);
        });

        // Add a delay to ensure the server is fully operational before proceeding with tests
        await delay(10000);  // waits for 10 seconds
    } catch (error) {
        console.error("Error setting up tests:", error);
    }
}, 120000);



afterAll(async () => {
  server.close()
  await stop();
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


// require("dotenv").config();
// const request = require("supertest");
// const app = require("../../server");
// const { MSSQLServerContainer } = require("../../mssql-test-container");

// let server;
// let mssqlContainer;
// let startedContainer;

// beforeAll(async () => {
//   mssqlContainer = new MSSQLServerContainer()
//     .withDatabase(process.env.TEST_SQL_DATABASE_NAME)
//     .withPassword(process.env.TEST_SQL_PASSWORD);

//   startedContainer = await mssqlContainer.start();

//   // Start the server after the database container has been started
//   const testPort = parseInt(process.env.TEST_PORT, 10) || 5002;
//   server = app.listen(testPort, () => {
//     console.log(`Test server started on port ${testPort}`);
//   });
// }, 120000);

// afterAll(async () => {
//   // server.close();
//   await startedContainer.stop();
// });

// describe("Account Endpoints", () => {
//   let userId; // id of the registered user - to be deleted by security admin
//   let adminToken; // jwt for security admin - for protected endpoints

//   // GET "/" Get all accounts (Security Admin only)

//   // PUT "/:id/roles" Update roles for an account (Security Admin only)

//   // POST "/register" Register a new account
//   it("should register a new user", async () => {
//     const res = await request(app)
//       .post("/api/accounts/register")
//       .send({
//         firstName: "Jose",
//         lastName: "Garcia",
//         email: `'josegarcia@test.com'`,
//         password: "Password1!!!"
//       });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("newId");
//     userId = res.body.newId;
//   });
// });
