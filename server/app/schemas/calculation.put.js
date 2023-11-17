module.exports = {
  type: "object",
  required: ["name", "description", "deprecated", "id"],
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
    },
    id: {
      type: "integer"
    }
  }
};
