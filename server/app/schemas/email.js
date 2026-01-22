module.exports = {
  type: "object",
  required: ["to", "subject"],
  properties: {
    to: {
      type: "string"
    },
    subject: {
      type: "string",
      minLength: 1
    },
    text: {
      type: "string"
    },
    html: {
      type: "string"
    }
  }
};
