module.exports = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      minLength: 3,
      pattern: "\\S+@\\S+"
    },
    password: {
      type: "string"
    }
  }
};
