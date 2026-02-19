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

describe("Feedback API endpoints for end user accounts", () => {
  let originalSendgrid = smtpMail.send;

  beforeAll(async () => {
    smtpMail.send = jest.fn(async () => {
      return { statusCode: 202 };
    });
  });

  afterAll(async () => {
    // cleanup state
    smtpMail.send = originalSendgrid;
  });

  // POST "/feedbacks" with a valid request body
  it("should post feedback", async () => {
    const res = await request(server)
      .post("/api/feedbacks")
      .send({
        name: "John Darragh",
        email: "darragh@entrotech.net",
        forwardToWebTeam: true,
        comment: "This is a test comment.",
        selectedProjects: [254]
      });
    expect(res.statusCode).toEqual(201);
  });

  // POST "/feedbacks" with empty comment
  it("should not post feedback without comment", async () => {
    const res = await request(server)
      .post("/api/feedbacks")
      .send({
        name: "John Darragh",
        email: "darragh@entrotech.net",
        forwardToWebTeam: true,
        comment: "",
        selectedProjects: [254]
      });
    expect(res.statusCode).toEqual(400);
  });

  // POST "/feedbacks" with empty name
  it("should not post feedback without name", async () => {
    const res = await request(server)
      .post("/api/feedbacks")
      .send({
        name: "",
        email: "darragh@entrotech.net",
        forwardToWebTeam: true,
        comment: "This is a test comment",
        selectedProjects: [254]
      });
    expect(res.statusCode).toEqual(400);
  });
});
