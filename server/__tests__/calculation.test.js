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

describe("tests that require a calculation id", () => {
  //////////////////////////////
  //          general         //
  //////////////////////////////
  let calcId; // id of the calculation

  beforeEach(async () => {
    // get a calculation id for the tests
    const res = await request(server).get("/api/calculations");
    calcId = res.body[0].id;
  });

  afterEach(async () => {
    // cleanup state
    calcId = undefined;
  });

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
  });

  // GET "/:calcId" calculation by id
  it("should get calculation by id", async () => {
    const res = await request(server).get(`/api/calculations/${calcId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(calcId);
  });

  // GET "/:calcId" calculation by inexistent id
  it("should NOT get calculation by id", async () => {
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
});
