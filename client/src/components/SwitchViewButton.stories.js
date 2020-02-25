import React from "react";
import { storiesOf } from "@storybook/react";
import SwitchViewButton from "./SwitchViewButton";
import { action } from "@storybook/addon-actions";

export const actions = {
  onClick: action("onClick")
};

storiesOf("SwitchViewButton", module).add("default", () => (
  <SwitchViewButton {...actions}>Switch View Button Label</SwitchViewButton>
));
