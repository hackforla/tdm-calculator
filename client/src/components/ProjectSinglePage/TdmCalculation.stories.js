import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TdmCalculation from "./TdmCalculation";
import Engine from "../../services/tdm-engine";
import { engineTestRules } from "../../test-data/engine-test";

export const actions = {
  onInputChange: action("onInputChange")
};

const formInputs = {
  INPUT_INTEGER_A: 4,
  INPUT_INTEGER_B: 17
};

const resultRuleCodes = [
  "CALC_A_PLUS_B",
  "CALC_A_TIMES_B",
  "CALC_HYPOTENUSE_AB"
];

const engine = new Engine(engineTestRules);
engine.run(formInputs, resultRuleCodes);
const rules = engine.showRulesArray();
// console.log(rules, null, 2);

storiesOf("TdmCalculation", module).add("default", () => (
  <TdmCalculation
    rules={rules}
    {...actions}
    resultRuleCodes={resultRuleCodes}
  />
));
