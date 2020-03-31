import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleInputPanels from "./RuleInputPanels";
import { tdmRules } from "../../../test-data/tdm-calc-rules";

const rules = tdmRules.filter(
  rule => rule.calculationPanelId >= 6 && rule.calculationPanelId <= 9
);

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleInputPanels", module).add("default", () => (
  <RuleInputPanels rules={rules} {...actions} />
));
