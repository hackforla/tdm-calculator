const request = require("supertest");
const sgMail = require("@sendgrid/mail");
const { server } = require("../../../server");
const {pool, poolConnect} = require("../../../app/services/tedious-pool"); // Importing pool

require("dotenv").config();

let originalSendgrid = sgMail.send;

describe("Account Endpoints", () => {
  beforeAll(async () => {
      try {
          await poolConnect;
          const request = pool.request();
          await request.query("USE master");
          await request.query(`RESTORE DATABASE tdmtestdb FROM DISK = '/var/opt/mssql/backup/tdmtestdb.bak' WITH REPLACE`);
          await request.query('USE tdmtestdb');
      } catch (error) {
          console.error('Error setting up tests:', error);
          throw error;  // This will cause Jest to abort the suite.
      }
  });

  afterAll(async () => {
    try {
        await pool.close();
        await server.close();
    } catch (error) {
        console.error('Error cleaning up after tests:', error);
        throw error;  // This will cause Jest to report an error.
    }
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

  let userId; 
  let adminToken; 
  let userToken; 

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
