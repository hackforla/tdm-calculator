module.exports = {
  type: "array",
  items: {
    type: "object",
    required: ["id","name", "displayOrder", "faqs"],
    properties: {
      id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      displayOrder: {
        type: "number",
      },
      faqs: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "question", "answer", "faqCategoryId", "displayOrder"],
          properties: {
            id: {
              type: "number",
            },
            question: {
              type: "string",
            },
            answer: {
              type: "string",
            },
            faqCategoryId: {
              type: "number",
            },
            displayOrder: {
              type: "number"
            }
          }
        }
      }
    }
  }
};