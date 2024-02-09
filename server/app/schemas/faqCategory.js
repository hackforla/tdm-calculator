module.exports = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "displayOrder", "faqs"],
    properties: {
      name: {
        type: "string",
      },
      displayOrder: {
        type: "number",
      },
      faqs: {
        type: "string",
      }
    }
  }
};