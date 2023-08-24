module.exports = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      minLength: 3,
      pattern: "\\S+@\\S+"
    }
  }
};
