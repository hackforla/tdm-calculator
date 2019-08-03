import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ResultView from "./ResultView";
import { targetPointsRule } from "../test-data/tdm-calc-rules";
import "../styles/App.scss";

// export const actions = {
//   onInputChange: action("onInputChange")
// };

storiesOf("ResultView", module).add("default", () => (
  <ResultView rule={{ ...targetPointsRule, value: -1 }} />
));
