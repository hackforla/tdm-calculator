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

describe("tests for faqcategories api", () => {
  let userToken;
  let adminToken;
  let capturedToken;
  let securityAdminToken;

  beforeAll(async () => {
    sgMail.send = jest.fn(async () => {
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

  // GET for all faqs
  it("should get all faqs(GET Request)", async () => {
    const res = await request(server).get("/api/faqcategories");
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(faqs => {
      expect(faqs).toHaveProperty("id");
      expect(faqs).toHaveProperty("name");
      expect(faqs).toHaveProperty("displayOrder");
      expect(faqs).toHaveProperty("faqs");
    });
  });

  // POST for faq -admin
  it("should allow admin to add faqs(POST request)", async () => {
    const res = await request(server)
      .post("/api/faqcategories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send([
        {
          id: 90,
          name: "test for faq",
          displayOrder: 90,
          faqs: [
            {
              id: 50,
              question: "question 1!",
              answer: "answer 1",
              faqCategoryId: 90,
              displayOrder: 2
            },
            {
              id: 51,
              question: "question 1!",
              answer: "answer 1",
              faqCategoryId: 92,
              displayOrder: 3
            }
          ]
        }
      ]);
    expect(res.statusCode).toEqual(201);
  });

  // POST for faq -normal user
  it("should not allow normal user to add faqs(POST request)", async () => {
    const res = await request(server)
      .post("/api/faqcategories")
      .set("Authorization", `Bearer ${userToken}`)
      .send([
        {
          id: 90,
          name: "test for faq",
          displayOrder: 90,
          faqs: [
            {
              id: 50,
              question: "question 1!",
              answer: "answer 1",
              faqCategoryId: 90,
              displayOrder: 2
            },
            {
              id: 51,
              question: "question 1!",
              answer: "answer 1",
              faqCategoryId: 92,
              displayOrder: 3
            }
          ]
        }
      ]);
    expect(res.statusCode).toEqual(403);
  });

  it("should not allow security admin to add faqs(POST request)", async () => {
    const res = await request(server)
      .post("/api/faqcategories")
      .set("Authorization", `Bearer ${securityAdminToken}`)
      .send([
        {
          id: 90,
          name: "test for faq",
          displayOrder: 90,
          faqs: [
            {
              id: 50,
              question: "question 1!",
              answer: "answer 1",
              faqCategoryId: 90,
              displayOrder: 2
            },
            {
              id: 51,
              question: "question 1!",
              answer: "answer 1",
              faqCategoryId: 92,
              displayOrder: 3
            }
          ]
        }
      ]);
    expect(res.statusCode).toEqual(403);
  });
});
