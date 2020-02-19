import React from "react";
import { storiesOf } from "@storybook/react";
import WizardNavButton from "./WizardNavButton";
import { action } from "@storybook/addon-actions";

export const actions = {
  onClick: action("onClick")
};

storiesOf("WizardNavButton", module)
  .add("enabled", () => (
    <WizardNavButton disabled={false} {...actions}>
      Wizard Nav Button Label
    </WizardNavButton>
  ))
  .add("disabled", () => (
    <WizardNavButton disabled={true} {...actions}>
      Wizard Nav Button Label
    </WizardNavButton>
  ));
