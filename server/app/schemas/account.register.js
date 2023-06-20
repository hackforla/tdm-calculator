module.exports = {
  type: "object",
  required: ["firstName", "lastName", "email", "password"],
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
      minLength: 3,
      pattern: "\\S+@\\S+"
    },
    password: {
      type: "string",
      minLength: 12,
      pattern:
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z0-9@$!%*#?&]{12,}$"
    }
  }
};


