module.exports = {
  type: "object",
  required: ["firstName", "lastName", "email"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      pattern:
        "^[a-zA-Z '.-]+$"
    },
    lastName: {
      type: "string",
      minLength: 1,
      pattern:
        "^[a-zA-Z '.-]+$"
    },
    email: {
      type: "string",
      pattern: "\\S+@\\S+"
    }
  }
};
