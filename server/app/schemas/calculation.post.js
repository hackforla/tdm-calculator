module.exports = {
  type: "object",
  required: ["name", "description", "deprecated"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      pattern: "^[a-zA-Z '.-]+$"
    },
    description: {
      type: "string",
      minLength: 1,
      pattern: "^[a-zA-Z '.-]+$"
    },
    deprecated: {
      type: "boolean"
    }
  }
};
