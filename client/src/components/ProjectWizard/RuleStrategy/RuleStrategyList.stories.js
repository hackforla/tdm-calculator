import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleStrategyList from "./RuleStrategyList";
import { tdmRules } from "../../../test-data/tdm-calc-rules";

const rules = tdmRules.filter(rule => rule.calculationPanelId === 22);

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleStrategyList", module).add("default", () => (
  <RuleStrategyList rules={rules} {...actions} />
));
