const rules = require("./tdm-calc-rules.json");
// These are the actual TDM calculation rules as of 2/17/2020
// in JavaScript array form for running tests
export const tdmRules = rules;

// Explicitly pick some rules to export for testing
export const numberInputRule = tdmRules.find(rule => rule.code === "SF_RETAIL");
export const booleanInputRule = tdmRules.find(
  rule => rule.code === "LAND_USE_RESIDENTIAL"
);
export const stringInputRule = tdmRules.find(
  rule => rule.code === "PROJECT_NAME"
);

export const booleanStrategyRule = tdmRules.find(
  rule => rule.code === "STRATEGY_PARKING_1"
);
export const numberStrategyRule = tdmRules.find(
  rule => rule.code === "PTS_ACCESS_3"
);
export const choiceStrategyRule = tdmRules.find(
  rule => rule.code === "STRATEGY_AFFORDABLE"
);

export const targetPointsRule = tdmRules.find(
  rule => rule.code === "TARGET_POINTS_PARK"
)[0];
