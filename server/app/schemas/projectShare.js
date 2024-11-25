module.exports = {
  type: "object",
  required: ["email", "projectId"],
  properties: {
    email: {
      type: "string",
      minLength: 3,
      pattern: "\\S+@\\S+"
    },
    projectId: {
      type: "number"
    }
  }
};
