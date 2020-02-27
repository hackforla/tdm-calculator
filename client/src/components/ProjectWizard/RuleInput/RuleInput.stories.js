import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RuleInput from "./RuleInput";
import {
  numberInputRule,
  booleanInputRule,
  stringInputRule
} from "../../../test-data/tdm-calc-rules";

export const actions = {
  onPropInputChange: action("onInputChange")
};

storiesOf("RuleInput", module)
  .add("default Input Number", () => (
    <RuleInput rule={{ ...numberInputRule, value: 42 }} {...actions} />
  ))
  .add("default Input Boolean (True)", () => (
    <RuleInput rule={{ ...booleanInputRule, value: true }} {...actions} />
  ))
  .add("default Input Boolean (False)", () => (
    <RuleInput rule={{ ...booleanInputRule, value: false }} {...actions} />
  ))
  .add("default Input String", () => (
    <RuleInput
      rule={{ ...stringInputRule, value: "My Project Name" }}
      {...actions}
    />
  ));
