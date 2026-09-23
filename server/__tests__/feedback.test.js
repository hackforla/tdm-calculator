const request = require("supertest");
const smtpMail = require("../app/services/smtp.service");
const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");
const { openapiSpec } = require("../app/docs/openapi");
const feedbackPostSchema = require("../app/schemas/feedback.post");
const { Validator } = require("express-json-validator-middleware");

const validator = new Validator({ allErrors: true });
let server;

beforeAll(async () => {
  server = await setupServer();
});

afterAll(async () => {
  await teardownServer();
});

describe("Feedback API endpoints and OpenAPI contract validation", () => {
  let userToken;
  let userId;
  let projectId;
  let originalSend = smtpMail.send;

  beforeAll(async () => {
    smtpMail.send = jest.fn(async () => {
      return { statusCode: 202 };
    });

    await request(server).post("/api/accounts/register").send({
      firstName: "Feedback",
      lastName: "Tester",
      email: "feedbacktester@test.com",
      password: "Password1!!!"
    });

    const tokenPattern = /\/confirm\/([a-zA-Z0-9-]+)/;
    const emailContent = smtpMail.send.mock.calls[0][0].html;
    const match = emailContent.match(tokenPattern);
    const capturedToken = match && match[1];

    await request(server)
      .post("/api/accounts/confirmRegister")
      .send({ token: capturedToken });

    const loginResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: "feedbacktester@test.com",
        password: "Password1!!!"
      });
    userToken = loginResponse.body.token;
    userId = loginResponse.body.user["id"];

    const projectResponse = await request(server)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Feedback Test Project",
        address: "100 Test St",
        description: "Project for feedback testing",
        formInputs: '{"PROJECT_NAME":"Feedback Test Project"}',
        loginId: userId,
        calculationId: 1
      });
    projectId = projectResponse.body.id;
  });

  afterAll(async () => {
    smtpMail.send = originalSend;
    userToken = undefined;
  });

  describe("OpenAPI Spec Contract", () => {
    it("should match documented path, security, and schema contract for POST /feedbacks", () => {
      const feedbackPath = openapiSpec.paths["/feedbacks"];
      expect(feedbackPath).toBeDefined();
      expect(feedbackPath.post).toBeDefined();

      const postOp = feedbackPath.post;
      expect(postOp.tags).toContain("Feedback");
      expect(postOp.security).toEqual([{ bearerAuth: [] }, { cookieAuth: [] }]);
      expect(
        postOp.requestBody.content["application/json"].schema.$ref
      ).toEqual("#/components/schemas/FeedbackPost");
      expect(postOp.responses["201"]).toBeDefined();
      expect(postOp.responses["400"]).toBeDefined();
      expect(postOp.responses["401"]).toBeDefined();
      expect(postOp.responses["500"]).toBeDefined();

      const feedbackSchemaInSpec = openapiSpec.components.schemas.FeedbackPost;
      expect(feedbackSchemaInSpec).toBeDefined();
      expect(feedbackSchemaInSpec.required).toEqual(
        expect.arrayContaining(["subject", "forwardToWebTeam", "comment"])
      );
      expect(feedbackSchemaInSpec.properties).toHaveProperty("subject");
      expect(feedbackSchemaInSpec.properties).toHaveProperty("comment");
      expect(feedbackSchemaInSpec.properties).toHaveProperty(
        "forwardToWebTeam"
      );
      expect(feedbackSchemaInSpec.properties).toHaveProperty(
        "selectedProjectIds"
      );
    });
  });

  describe("POST /api/feedbacks", () => {
    it("should submit feedback successfully with valid payload matching schema", async () => {
      const payload = {
        subject: "General feedback regarding project calculations",
        comment: "The calculation tool works smoothly.",
        forwardToWebTeam: false,
        selectedProjectIds: [projectId]
      };

      const isValid = validator.ajv.validate(feedbackPostSchema, payload);
      expect(isValid).toBe(true);

      const res = await request(server)
        .post("/api/feedbacks")
        .set("Authorization", `Bearer ${userToken}`)
        .send(payload);

      expect(res.statusCode).toEqual(201);
    });

    it("should submit feedback without selected project IDs", async () => {
      const payload = {
        subject: "Website UI suggestion",
        comment: "Great user interface and experience.",
        forwardToWebTeam: true,
        selectedProjectIds: []
      };

      const isValid = validator.ajv.validate(feedbackPostSchema, payload);
      expect(isValid).toBe(true);

      const res = await request(server)
        .post("/api/feedbacks")
        .set("Authorization", `Bearer ${userToken}`)
        .send(payload);

      expect(res.statusCode).toEqual(201);
    });

    it("should reject feedback when missing required subject", async () => {
      const invalidPayload = {
        comment: "Feedback missing subject",
        forwardToWebTeam: true
      };

      const isValid = validator.ajv.validate(
        feedbackPostSchema,
        invalidPayload
      );
      expect(isValid).toBe(false);

      const res = await request(server)
        .post("/api/feedbacks")
        .set("Authorization", `Bearer ${userToken}`)
        .send(invalidPayload);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("errors");
      expect(Array.isArray(res.body.errors.body)).toBe(true);
      expect(res.body.errors.body[0].message).toMatch(
        /must have required property|should have required property/i
      );
    });

    it("should reject feedback with empty comment violating minLength", async () => {
      const invalidPayload = {
        subject: "Feedback with empty comment",
        comment: "",
        forwardToWebTeam: false
      };

      const isValid = validator.ajv.validate(
        feedbackPostSchema,
        invalidPayload
      );
      expect(isValid).toBe(false);

      const res = await request(server)
        .post("/api/feedbacks")
        .set("Authorization", `Bearer ${userToken}`)
        .send(invalidPayload);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("errors");
      expect(Array.isArray(res.body.errors.body)).toBe(true);
      expect(res.body.errors.body[0].message).toMatch(
        /fewer than 1 characters|minLength/i
      );
    });

    it("should reject feedback with invalid selectedProjectIds type", async () => {
      const invalidPayload = {
        subject: "Feedback with non-integer project IDs",
        comment: "Invalid data type test.",
        forwardToWebTeam: false,
        selectedProjectIds: ["not-an-integer-id"]
      };

      const isValid = validator.ajv.validate(
        feedbackPostSchema,
        invalidPayload
      );
      expect(isValid).toBe(false);

      const res = await request(server)
        .post("/api/feedbacks")
        .set("Authorization", `Bearer ${userToken}`)
        .send(invalidPayload);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("errors");
      expect(Array.isArray(res.body.errors.body)).toBe(true);
    });

    it("should reject feedback submission when unauthenticated", async () => {
      const payload = {
        subject: "Unauthenticated feedback",
        comment: "This should fail because no user is logged in.",
        forwardToWebTeam: false
      };

      const res = await request(server).post("/api/feedbacks").send(payload);

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });
});
