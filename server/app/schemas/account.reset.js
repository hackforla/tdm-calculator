module.exports = {
  type: "object",
  required: ["token", "password"],
  properties: {
    token: {
      type: "string"
    },
    password: {
      type: "string"
    }
  }
};
