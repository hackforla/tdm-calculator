const droSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 200 },
    displayOrder: { type: "integer", minimum: 1 }
  },
  required: ["name", "displayOrder"],
  additionalProperties: false
};

module.exports = droSchema;
