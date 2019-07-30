import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleInput from "./RuleInput";

const numberInputRule = {
  id: 7,
  calculationId: 1,
  code: "INPUT_CODE",
  name: "Number Input",
  category: "input",
  dataType: "number",
  value: 7,
  units: "cubits",
  cssClass: "rule-input",
  functionBody: "",
  panelDisplayOrder: 1,
  displayOrder: 450,
  displayPanelId: 1,
  panelName: "Panel Title"
};
const booleanInputRule = {
  id: 7,
  calculationId: 1,
  code: "INPUT_CODE",
  name: "Number Input",
  category: "input",
  dataType: "boolean",
  value: true,
  units: null,
  cssClass: "rule-input",
  functionBody: "",
  panelDisplayOrder: 1,
  displayOrder: 450,
  displayPanelId: 1,
  panelName: "Panel Title"
};

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleInput", module)
  .add("default Input Number", () => (
    <RuleInput rule={numberInputRule} {...actions} />
  ))
  .add("default Input Boolean (True)", () => (
    <RuleInput rule={booleanInputRule} {...actions} />
  ))
  .add("default Input Boolean (False)", () => (
    <RuleInput rule={{ ...booleanInputRule, value: false }} {...actions} />
  ));
