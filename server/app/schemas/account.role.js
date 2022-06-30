module.exports = {
  type: "object",
  required: ["id", "isAdmin", "isSecurityAdmin"],
  properties: {
    id: {
      type: "number"
    },
    isAdmin: {
      type: "number"
    },
    isSecurityAdmin: {
      type: "number"
    }
  }
};
