module.exports = {
  type: "object",
  required: ["firstName", "lastName", "email", "password"],
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
    },
    password: {
      type: "string",
      minLength: 12,
      pattern:
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z0-9@$!%*#?&]{12,}$"
    }
  }
};
