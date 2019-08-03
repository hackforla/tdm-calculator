import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleInput from "./RuleInput";
import { numberInputRule, booleanInputRule } from "../test-data/tdm-calc-rules";
import "../styles/App.scss";

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("RuleInput", module)
  .add("default Input Number", () => (
    <RuleInput rule={numberInputRule} {...actions} />
  ))
  .add("default Input Boolean (True)", () => (
    <RuleInput rule={{ ...booleanInputRule, value: true }} {...actions} />
  ))
  .add("default Input Boolean (False)", () => (
    <RuleInput rule={{ ...booleanInputRule, value: false }} {...actions} />
  ));
