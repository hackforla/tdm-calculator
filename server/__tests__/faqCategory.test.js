const request = require("supertest");
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

  beforeAll(async () => {
    const userTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: "josegarcia@test.com",
        password: "Password1!!!"
      });
    userToken = userTokenResponse.body.token;

    // login as admin
    const adminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    adminToken = adminTokenResponse.body.token;
  });

  afterAll(async () => {
    // cleanup state
    userToken = undefined;
    adminToken = undefined;
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
    expect(res.statusCode).toEqual(401);
  });
});
