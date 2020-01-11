import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RulePanels from "./RulePanels";
import { tdmRules } from "../../test-data/tdm-calc-rules";
import "../styles/App.scss";

const rules = tdmRules.filter(
  rule => rule.calculationPanelId >= 6 && rule.calculationPanelId <= 9
);

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RulePanels", module).add("default", () => (
  <RulePanels rules={rules} {...actions} />
));
