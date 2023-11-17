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

describe("Calculation API Endpoints", () => {
  //////////////////////////////
  //          general          //
  //////////////////////////////
  let calcId; // id of the calculation

  // GET "/" all calculations
  it("should get all calculations", async () => {
    const res = await request(server).get("/api/calculations");
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(calc => {
      expect(calc).toHaveProperty("id");
      expect(calc).toHaveProperty("name");
      expect(calc).toHaveProperty("description");
      expect(calc).toHaveProperty("deprecated");
      expect(calc).toHaveProperty("dateCreated");
      expect(calc).toHaveProperty("dateModified");
    });
    calcId = res.body[0].id;
  });

  // GET "/:calcId" calculation by id
  it("should get calculation by id", async () => {
    const res = await request(server).get(`/api/calculations/${calcId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(calcId);
  });

  // GET "/:calcId" calculation by inexistent id
  it("should get calculation by id", async () => {
    const res = await request(server).get(`/api/calculations/9999999`);
    expect(res.statusCode).toEqual(404);
  });

  // GET "/:calcId/rules" all rules for a calculation
  it("should get all rules for a calculation", async () => {
    const res = await request(server).get(`/api/calculations/${calcId}/rules`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(calc => {
      expect(calc).toHaveProperty("id");
      expect(calc).toHaveProperty("calculationId");
      expect(calc.calculationId).toEqual(calcId);
    });
  });

  //////////////////////////////
  //      admin endpoints      //
  //////////////////////////////
  let adminToken; // token of the admin
  let newCalcId; // id of the new calculation

  // POST "accounts/login/:email?" Login as admin to get token
  it("should login as a security admin", async () => {
    const res = await request(server).post("/api/accounts/login").send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    adminToken = res.body.token;
  });

  // POST "/" Create a calculation (Admin only)
  it("should create a calculation", async () => {
    const res = await request(server)
      .post("/api/calculations")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Name",
        description: "Test Description",
        deprecated: false
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    newCalcId = res.body.id;
  });

  // POST "/" Create a calculation with invalid body (Admin only)
  it("should create a calculation", async () => {
    const res = await request(server)
      .post("/api/calculations")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: true,
        description: 1,
        deprecated: true,
        id: "string"
      });
    expect(res.statusCode).toEqual(400);
  });

  // PUT "/:id" Update calculation (Admin only)
  it("should update a calculation", async () => {
    const res = await request(server)
      .put(`/api/calculations/${newCalcId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "New Test Name",
        description: "New Test Description",
        deprecated: true,
        id: newCalcId
      });
    expect(res.statusCode).toEqual(200);
  });

  // PUT "/:id" Update calculation with invalid body(Admin only)
  it("should update a calculation", async () => {
    const res = await request(server)
      .put(`/api/calculations/${newCalcId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: true,
        description: 1,
        deprecated: true,
        id: "string"
      });
    expect(res.statusCode).toEqual(400);
  });

  // PUT "/:id" Update calculation using inexistent id (Admin only)
  //TODO: this endpoint logic needs error handling for inexistent ids

  // DELETE "/:id" Delete a calculation (Admin only)
  it("should delete a calculation", async () => {
    const res = await request(server)
      .delete(`/api/calculations/${newCalcId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  // DELETE "/:id" Delete a calculation using inexistent id (Admin only)
  //TODO: this endpoint needs error handling for inexistent ids
});
