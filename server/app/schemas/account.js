module.exports = {
  type: "object",
  required: ["id", "firstName", "lastName", "email"],
  properties: {
    id: {
      type: "number"
    },
    firstName: {
      type: "string",
      minLength: 1
    },
    lastName: {
      type: "string",
      minLength: 1
    },
    email: {
      type: "string",
      minLength: 1
    }
  }
};
