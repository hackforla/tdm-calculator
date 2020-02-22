import React from "react";
import { storiesOf } from "@storybook/react";
import ResultView from "./ResultView";
import { targetPointsRule } from "../../test-data/tdm-calc-rules";

// export const actions = {
//   onInputChange: action("onInputChange")
// };

storiesOf("SinglePageResultView", module).add("default", () => (
  <ResultView rule={{ ...targetPointsRule, value: -1 }} />
));
