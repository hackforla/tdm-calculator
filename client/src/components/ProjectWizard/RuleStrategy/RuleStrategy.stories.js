import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleStrategy from "./RuleStrategy";
import {
  numberStrategyRule,
  booleanStrategyRule,
  choiceStrategyRule
} from "../../../test-data/tdm-calc-rules";

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleInput", module)
  .add("default Strategy Number", () => (
    <RuleStrategy rule={numberStrategyRule} {...actions} />
  ))
  .add("default Strategy Boolean (True)", () => (
    <RuleStrategy rule={{ ...booleanStrategyRule, value: true }} {...actions} />
  ))
  .add("default Strategy Boolean (False)", () => (
    <RuleStrategy
      rule={{ ...booleanStrategyRule, value: false }}
      {...actions}
    />
  ))
  .add("default Strategy Choice", () => (
    <RuleStrategy rule={{ ...choiceStrategyRule, value: false }} {...actions} />
  ));
