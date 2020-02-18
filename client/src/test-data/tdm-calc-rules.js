const rules = require("./tdm-calc-rules.json");
// These are the actual TDM calculation rules as of 2/17/2020
// in JavaScript array form for running tests
export const tdmRules = rules;

// Explicitly pick some rules to export for testing
export const numberInputRule = tdmRules.filter(
  rule => rule.code === "SF_RETAIL"
)[0];
export const booleanInputRule = tdmRules.filter(
  rule => rule.code === "STRATEGY_PARKING_1"
)[0];
export const targetPointsRule = tdmRules.filter(
  rule => rule.code === "TARGET_POINTS_PARK"
)[0];
