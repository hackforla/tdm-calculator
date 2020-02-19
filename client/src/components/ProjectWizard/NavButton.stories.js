import React from "react";
import { storiesOf } from "@storybook/react";
import NavButton from "./NavButton";
import { action } from "@storybook/addon-actions";

export const actions = {
  onClick: action("onClick")
};

storiesOf("NavButton", module)
  .add("enabled", () => (
    <NavButton disabled={false} {...actions}>
      Wizard Nav Button Label
    </NavButton>
  ))
  .add("disabled", () => (
    <NavButton disabled={true} {...actions}>
      Wizard Nav Button Label
    </NavButton>
  ));
