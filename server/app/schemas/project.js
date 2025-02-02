module.exports = {
  type: "object",
  required: ["name", "address", "formInputs", "loginId", "calculationId"],
  properties: {
    name: {
      type: "string"
    },
    address: {
      type: "string"
    },
    description: {
      type: "string"
    },
    formInputs: {
      type: "string"
    },
    loginId: {
      type: "number"
    },
    calculationId: {
      type: "number"
    },
    targetPoints: {
      type: "number"
    },
    earnedPoints: {
      type: "number"
    },
    projectLevel: {
      type: "number"
    }
  }
};
