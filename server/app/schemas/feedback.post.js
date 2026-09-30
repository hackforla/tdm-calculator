module.exports = {
  type: "object",
  required: ["subject", "forwardToWebTeam", "comment"],
  properties: {
    subject: {
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
    loginId: {
      type: "integer"
    },
    selectedProjectIds: {
      type: "array",
      items: {
        type: "integer"
      }
    }
  }
};
