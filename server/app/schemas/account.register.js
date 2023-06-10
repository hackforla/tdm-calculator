module.exports = {
  type: "object",
  required: ["firstName", "lastName", "email", "password"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      pattern:
        "/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/"
    },
    lastName: {
      type: "string",
      minLength: 1,
      pattern:
        "/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/"
    },
    email: {
      type: "string",
      pattern:
        "/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/"
    },
    password: {
      type: "string",
      minLength: 12,
      pattern:
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z0-9@$!%*#?&]{12,}$"
    }
  }
};
