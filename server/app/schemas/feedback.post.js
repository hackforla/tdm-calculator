module.exports = {
  type: "object",
  required: ["name", "email", "forwardToWebTeam", "comment"],
  properties: {
    email: {
      type: "string",
      minLength: 3,
      pattern: "\\S+@\\S+"
    },
    name: {
      type: "string",
      minLength: 1
    },
    comment: {
      type: "string",
      minLength: 1
    },
    forwardToWebTeam: {
      type: "boolean"
    },
    selectedProjects: {
      type: "array"
    }
  }
};
