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

describe("Test cases for the projects api", () => {
  let adminToken;
  let securityAdminToken;
  let userToken;
  let userId;
  let capturedToken; // confirmation token captured from the mocked sendgrid function
  let projectIdUser;
  let adminId;

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
    userId = loginResponse.body.user["id"];

    const adminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    adminToken = adminTokenResponse.body.token;
    adminId = adminTokenResponse.body.user["id"];

    const securityAdminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.SECURITY_ADMIN_EMAIL,
        password: process.env.SECURITY_ADMIN_PASSWORD
      });
    securityAdminToken = securityAdminTokenResponse.body.token;

    // insert 1 sample project data to access it
    const inputdata = await request(server)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "test3",
        address: "test3",
        description: "test3",
        formInputs:
          '{"PROJECT_NAME":"test3","PROJECT_ADDRESS":"test3","APN":"1111-111-111","UNITS_CONDO":"11111","PARK_CONDO":"11","UNITS_HABIT_LT3":"111","PARK_SPACES":"1","STRATEGY_PARKING_5":4,"STRATEGY_BIKE_4":true,"STRATEGY_AFFORDABLE":"3","STRATEGY_BIKE_1":"1","STRATEGY_CAR_SHARE_1":"1"}',
        loginId: userId,
        calculationId: 1
      });
    projectIdUser = inputdata.body.id;
  });
  afterAll(async () => {
    userToken = undefined;
    adminToken = undefined;
  });

  //Projects - getAll
  it("should allow security admin to get projects", async () => {
    const res = await request(server)
      .get("/api/projects")
      .set("Authorization", `Bearer ${securityAdminToken}`);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(project => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("name");
      expect(project).toHaveProperty("address");
      expect(project).toHaveProperty("formInputs");
      expect(project).toHaveProperty("loginId");
      expect(project).toHaveProperty("calculationId");
      expect(project).toHaveProperty("dateCreated");
      expect(project).toHaveProperty("dateModified");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("firstName");
      expect(project).toHaveProperty("lastName");
      expect(project).toHaveProperty("dateHidden");
      expect(project).toHaveProperty("dateTrashed");
      expect(project).toHaveProperty("dateSnapshotted");
    });
  });

  it("should allow admin to get all projects", async () => {
    const res = await request(server)
      .get("/api/projects")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(project => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("name");
      expect(project).toHaveProperty("address");
      expect(project).toHaveProperty("formInputs");
      expect(project).toHaveProperty("loginId");
      expect(project).toHaveProperty("calculationId");
      expect(project).toHaveProperty("dateCreated");
      expect(project).toHaveProperty("dateModified");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("firstName");
      expect(project).toHaveProperty("lastName");
      expect(project).toHaveProperty("dateHidden");
      expect(project).toHaveProperty("dateTrashed");
      expect(project).toHaveProperty("dateSnapshotted");
    });
  });

  it("should allow registered user to get projects", async () => {
    const res = await request(server)
      .get("/api/projects")
      .set("Authorization", `Bearer ${userToken}`);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(project => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("name");
      expect(project).toHaveProperty("address");
      expect(project).toHaveProperty("formInputs");
      expect(project).toHaveProperty("loginId");
      expect(project).toHaveProperty("calculationId");
      expect(project).toHaveProperty("dateCreated");
      expect(project).toHaveProperty("dateModified");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("firstName");
      expect(project).toHaveProperty("lastName");
      expect(project).toHaveProperty("dateHidden");
      expect(project).toHaveProperty("dateTrashed");
      expect(project).toHaveProperty("dateSnapshotted");
    });
  });

  it("should not allow unregistered user to get projects", async () => {
    const res = await request(server).get("/api/projects");
    expect(res.statusCode).toEqual(401);
  });

  //Projects - getById
  it("should allow admin to get projects by id", async () => {
    const res = await request(server)
      .get(`/api/projects/${projectIdUser}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(projectIdUser);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("address");
    expect(res.body).toHaveProperty("formInputs");
    expect(res.body).toHaveProperty("loginId");
    expect(res.body).toHaveProperty("calculationId");
    expect(res.body).toHaveProperty("dateCreated");
    expect(res.body).toHaveProperty("dateModified");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("firstName");
    expect(res.body).toHaveProperty("lastName");
    expect(res.body).toHaveProperty("dateHidden");
    expect(res.body).toHaveProperty("dateTrashed");
    expect(res.body).toHaveProperty("dateSnapshotted");
  });

  it("should allow registered user to get projects by id", async () => {
    const res = await request(server)
      .get(`/api/projects/${projectIdUser}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(projectIdUser);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("address");
    expect(res.body).toHaveProperty("formInputs");
    expect(res.body).toHaveProperty("loginId");
    expect(res.body).toHaveProperty("calculationId");
    expect(res.body).toHaveProperty("dateCreated");
    expect(res.body).toHaveProperty("dateModified");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("firstName");
    expect(res.body).toHaveProperty("lastName");
    expect(res.body).toHaveProperty("dateHidden");
    expect(res.body).toHaveProperty("dateTrashed");
    expect(res.body).toHaveProperty("dateSnapshotted");
  });

  it("should not allow unregistered user to get projects by id", async () => {
    const res = await request(server).get("/api/projects/7");
    expect(res.statusCode).toEqual(401);
  });

  it("should not allow registered user to access others projects", async () => {
    const res = await request(server)
      .get("/api/projects/7")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(404);
  });

  //Projects - post
  it("should allow registered user to create project", async () => {
    const res = await request(server)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "test4",
        address: "test4",
        description: "test4",
        formInputs:
          '{"PROJECT_NAME":"test3","PROJECT_ADDRESS":"test3","APN":"1111-111-111","UNITS_CONDO":"11111","PARK_CONDO":"11","UNITS_HABIT_LT3":"111","PARK_SPACES":"1","STRATEGY_PARKING_5":4,"STRATEGY_BIKE_4":true,"STRATEGY_AFFORDABLE":"3","STRATEGY_BIKE_1":"1","STRATEGY_CAR_SHARE_1":"1"}',
        loginId: userId,
        calculationId: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should allow admin to add projects", async () => {
    const res = await request(server)
      .post("/api/projects")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "test5",
        address: "test5",
        formInputs:
          '{"PROJECT_NAME":"test3","PROJECT_ADDRESS":"test3","APN":"1111-111-111","UNITS_CONDO":"11111","PARK_CONDO":"11","UNITS_HABIT_LT3":"111","PARK_SPACES":"1","STRATEGY_PARKING_5":4,"STRATEGY_BIKE_4":true,"STRATEGY_AFFORDABLE":"3","STRATEGY_BIKE_1":"1","STRATEGY_CAR_SHARE_1":"1"}',
        loginId: adminId,
        calculationId: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should not allow unregistered user to add projects", async () => {
    const res = await request(server).post("/api/projects").send({
      name: "test6",
      address: "test6",
      description: "test6",
      formInputs:
        '{"PROJECT_NAME":"test3","PROJECT_ADDRESS":"test3","APN":"1111-111-111","UNITS_CONDO":"11111","PARK_CONDO":"11","UNITS_HABIT_LT3":"111","PARK_SPACES":"1","STRATEGY_PARKING_5":4,"STRATEGY_BIKE_4":true,"STRATEGY_AFFORDABLE":"3","STRATEGY_BIKE_1":"1","STRATEGY_CAR_SHARE_1":"1"}',
      loginId: 80,
      calculationId: 1
    });
    expect(res.statusCode).toEqual(401);
  });

  //Project - put
  it("should allow user to edit the project", async () => {
    const res = await request(server)
      .put(`/api/projects/${projectIdUser}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "test",
        address: "123 test, ca",
        description: "123",
        formInputs:
          '{"PROJECT_NAME":"test","PROJECT_ADDRESS":"123 test, ca","APN":"0000-000-000,1111-111-111","UNITS_CONDO":"11111","PARK_CONDO":"1111","UNITS_HABIT_LT3":"111","UNITS_HABIT_3":"111","UNITS_HABIT_GT3":"111","UNITS_GUEST":"111","SF_RETAIL":"11","SF_FURNITURE":"11","SF_RESTAURANT":"11","SF_HEALTH_CLUB":"11","SF_RESTAURANT_TAKEOUT":"11","SF_OFFICE":"11","SF_INST_GOV":"1","SF_INST_OTHER":"1","SF_INDUSTRIAL":"1","SF_WAREHOUSE":"1","SF_HOSPITAL":"1","BED_HOSPITAL":"1","STUDENTS_ELEMENTARY":"11","CLASSROOM_SCHOOL":"1","STUDENTS_TRADE_SCHOOL":"1","SF_TRADE_SCHOOL":"1","HS_STUDENTS":"1","HS_AUDITORIUM_SEATS":"1","SEAT_AUDITORIUM":"1","SF_AUDITORIUM_NO_SEATS":"1","PARK_SPACES":"111","STRATEGY_PARKING_5":4,"STRATEGY_BIKE_4":true,"STRATEGY_BIKE_1":"1","STRATEGY_AFFORDABLE":"2","STRATEGY_BIKE_5":"2","PROJECT_DESCRIPTION":"123","VERSION_NO":"11","BUILDING_PERMIT":"11","CASE_NO_LADOT":"11","CASE_NO_PLANNING":"11"}',
        loginId: userId,
        calculationId: 1,
        id: projectIdUser
      });
    expect(res.statusCode).toEqual(204);
  });

  it("should not allow unauthorized to edit any project", async () => {
    const res = await request(server).put("/api/projects/8").send({
      name: "test",
      address: "123 test, ca",
      description: "123",
      formInputs:
        '{"PROJECT_NAME":"test","PROJECT_ADDRESS":"123 test, ca","APN":"0000-000-000,1111-111-111","UNITS_CONDO":"11111","PARK_CONDO":"1111","UNITS_HABIT_LT3":"111","UNITS_HABIT_3":"111","UNITS_HABIT_GT3":"111","UNITS_GUEST":"111","SF_RETAIL":"11","SF_FURNITURE":"11","SF_RESTAURANT":"11","SF_HEALTH_CLUB":"11","SF_RESTAURANT_TAKEOUT":"11","SF_OFFICE":"11","SF_INST_GOV":"1","SF_INST_OTHER":"1","SF_INDUSTRIAL":"1","SF_WAREHOUSE":"1","SF_HOSPITAL":"1","BED_HOSPITAL":"1","STUDENTS_ELEMENTARY":"11","CLASSROOM_SCHOOL":"1","STUDENTS_TRADE_SCHOOL":"1","SF_TRADE_SCHOOL":"1","HS_STUDENTS":"1","HS_AUDITORIUM_SEATS":"1","SEAT_AUDITORIUM":"1","SF_AUDITORIUM_NO_SEATS":"1","PARK_SPACES":"111","STRATEGY_PARKING_5":4,"STRATEGY_BIKE_4":true,"STRATEGY_BIKE_1":"1","STRATEGY_AFFORDABLE":"2","STRATEGY_BIKE_5":"2","PROJECT_DESCRIPTION":"123","VERSION_NO":"11","BUILDING_PERMIT":"11","CASE_NO_LADOT":"11","CASE_NO_PLANNING":"11"}',
      loginId: 9,
      calculationId: 1,
      id: 8
    });
    expect(res.statusCode).toEqual(401);
  });

  //Project - trash
  it("should allow user to delete their own project", async () => {
    const res = await request(server)
      .put("/api/projects/trash")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        ids: [projectIdUser],
        trash: true
      });
    expect(res.statusCode).toEqual(204);
  });

  it("should not allow unauthorized user to delete any project", async () => {
    const res = await request(server)
      .put("/api/projects/trash")
      .send({
        ids: [3],
        trash: true
      });
    expect(res.statusCode).toEqual(401);
  });

  //Project - snapshot
});
