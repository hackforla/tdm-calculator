import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleStrategyPanels from "./RuleStrategyPanels";
import { tdmRules } from "../../../test-data/tdm-calc-rules";

const rules = tdmRules.filter(
  rule => rule.calculationPanelId >= 13 && rule.calculationPanelId <= 16
);

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleStrategyPanels", module).add("default", () => (
  <RuleStrategyPanels rules={rules} {...actions} />
));
