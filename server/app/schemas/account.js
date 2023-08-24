module.exports = {
  type: "object",
  required: ["id", "firstName", "lastName", "email"],
  properties: {
    id: {
      type: "number"
    },
    firstName: {
      type: "string",
      minLength: 1,
      pattern: "^[a-zA-Z '.-]+$"
    },
    lastName: {
      type: "string",
      minLength: 1,
      pattern: "^[a-zA-Z '.-]+$"
    },
    email: {
      type: "string",
      minLength: 3,
      pattern: "\\S+@\\S+"
    }
  }
};
