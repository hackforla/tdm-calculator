module.exports = {
  type: "object",
  required: ["firstName", "lastName", "email"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1
    },
    lastName: {
      type: "string",
      minLength: 1
    },
    email: {
      type: "string"
    }
  }
};
