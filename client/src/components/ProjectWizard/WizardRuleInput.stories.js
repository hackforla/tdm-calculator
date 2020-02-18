import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import WizardRuleInput from "./WizardRuleInput";
import {
  numberInputRule,
  booleanInputRule
} from "../../test-data/tdm-calc-rules";

export const actions = {
  onInputChange: action("onInputChange")
};

storiesOf("WizardRuleInput", module)
  .add("default Input Number", () => (
    <WizardRuleInput rule={numberInputRule} {...actions} />
  ))
  .add("default Input Boolean (True)", () => (
    <WizardRuleInput rule={{ ...booleanInputRule, value: true }} {...actions} />
  ))
  .add("default Input Boolean (False)", () => (
    <WizardRuleInput
      rule={{ ...booleanInputRule, value: false }}
      {...actions}
    />
  ));
