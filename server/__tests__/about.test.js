const request = require("supertest");
const smtpMail = require("../app/services/smtp.service");
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

describe("tests about editing api", () => {
  let userToken;
  let adminToken;
  let capturedToken;
  let securityAdminToken;

  beforeAll(async () => {
    smtpMail.send = jest.fn(async () => {
      return { statusCode: 202 };
    });

    await request(server).post("/api/accounts/register").send({
      firstName: "Jose",
      lastName: "Garcia",
      email: "josegarcia@test.com",
      password: "Password1!!!"
    });

    // captures the token from the mocked sendgird function to be used in registration confirmation
    const tokenPattern = /\/confirm\/([a-zA-Z0-9-]+)/;
    const emailContent = smtpMail.send.mock.calls[0][0].html;
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

    // login as admin
    const adminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });

    adminToken = adminTokenResponse.body.token;

    const securityAdminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.SECURITY_ADMIN_EMAIL,
        password: process.env.SECURITY_ADMIN_PASSWORD
      });

    securityAdminToken = securityAdminTokenResponse.body.token;
  });

  afterAll(async () => {
    // cleanup state
    userToken = undefined;
    adminToken = undefined;
    securityAdminToken = undefined;
    capturedToken = undefined;
  });

  // GET for all about content
  it("should get all about content(GET Request)", async () => {
    const res = await request(server).get("/api/about");
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(aboutSection => {
      expect(aboutSection).toHaveProperty("id");
      expect(aboutSection).toHaveProperty("title");
      expect(aboutSection).toHaveProperty("displayOrder");
      expect(aboutSection).toHaveProperty("content");
    });
  });

  // POST for about section -admin
  it("should allow admin to add about sections(POST request)", async () => {
    const res = await request(server)
      .post("/api/about")
      .set("Authorization", `Bearer ${adminToken}`)
      .send([
        {
          id: 90,
          title: "test title for about from admin",
          displayOrder: 90,
          content: "test content for about from admin"
        }
      ]);
    expect(res.statusCode).toEqual(201);
  });

  // POST for about section -normal user
  it("should not allow normal user to add about sections(POST request)", async () => {
    const res = await request(server)
      .post("/api/about")
      .set("Authorization", `Bearer ${userToken}`)
      .send([
        {
          id: 50,
          title: "title 1!",
          content: "content 1",
          displayOrder: 2
        },
        {
          id: 51,
          title: "title 2!",
          content: "content 2",
          displayOrder: 3
        }
      ]);
    expect(res.statusCode).toEqual(403);
  });

  it("should not allow security admin to add about sections(POST request)", async () => {
    const res = await request(server)
      .post("/api/about")
      .set("Authorization", `Bearer ${securityAdminToken}`)
      .send([
        {
          id: 50,
          title: "title 1!",
          content: "content 1",
          displayOrder: 2
        },
        {
          id: 51,
          title: "title 2!",
          content: "content 2",
          displayOrder: 3
        }
      ]);
    expect(res.statusCode).toEqual(403);
  });
});
