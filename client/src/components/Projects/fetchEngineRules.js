import * as ruleService from "../../services/rule.service";
import Engine from "../../services/tdm-engine";

// These are the calculation results we want to calculate
// and display on the main page.
// TODO: share these constants  with the real thing in TdmCalculationContainer
//   const calculationId = 1; // TdmCalculationContainer.calculationId = 1;
const resultRuleCodes = [
  "PROJECT_LEVEL",
  "CALC_PARK_RATIO",
  "TARGET_POINTS_PARK",
  "PTS_EARNED"
];

const fetchEngineRules = async project => {
  const ruleResponse = await ruleService.getByCalculationId(
    project.calculationId
  );
  const engine = new Engine(ruleResponse.data);

  const inputs = project.formInputs;
  const data = JSON.parse(inputs);

  engine.run(data, resultRuleCodes);
  const rules = engine.showRulesArray();
  return rules;
};

export default fetchEngineRules;
