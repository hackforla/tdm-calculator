import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleList from "./RuleList";
import { tdmRules } from "../../test-data/tdm-calc-rules";

const rules = tdmRules.filter(rule => rule.calculationPanelId === 6);

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleList", module).add("default", () => (
  <RuleList rules={rules} {...actions} />
));
