const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const { server } = require("../../../server");
// const { restoreDatabase } = require("../../jest-mssql-container");

require("dotenv").config();

let originalSendgrid = sgMail.send;

describe("Account Endpoints", () => {
//   beforeAll(async () => {
//         await restoreDatabase();
//   });

  afterAll(() => {
    // Close the server after all tests are done
    server.close();
  });

  beforeEach(() => {
  // Mock the sendgrid mail api function
  sgMail.send = jest.fn(async (msg) => {
    return {statusCode: 202};
  });
  });

  afterEach(() => {
    // Restore the original function after each test
    sgMail.send = originalSendgrid;
  });

  let userId; // id of the registered user - to be deleted by security admin
  let adminToken; // jwt for security admin - for protected endpoints
  let userToken; // jwt for registered user - for protected endpoints

  //////////////////////////////
  //      user endpoints      //
  //////////////////////////////

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