module.exports = {
  type: "array",
  items: {
    type: "object",
    required: ["id", "title", "displayOrder", "content"],
    properties: {
      id: {
        type: "number"
      },
      title: {
        type: "string"
      },
      displayOrder: {
        type: "number"
      },
      content: {
        type: "string"
      }
    }
  }
};
