module.exports = {
  type: "object",
  required: ["email", "firstName", "lastName"],
  properties: {
    email: {
      type: "string",
      minLength: 3,
      pattern: "\\S+@\\S+"
    },
    firstName: {
      type: "string",
      minLength: 1
    },
    lastName: {
      type: "string",
      minLength: 1
    }
  }
};
