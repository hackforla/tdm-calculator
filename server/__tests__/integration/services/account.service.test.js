const request = require("supertest");
const server = require("../../../server")

describe("Account Endpoints", () => {

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
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("newId");
  });
});
