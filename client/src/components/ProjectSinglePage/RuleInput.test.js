import React from "react";
import ReactDOM from "react-dom";
import RuleInput from "./RuleInput";
import {
  numberInputRule,
  booleanInputRule
} from "../../test-data/tdm-calc-rules";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <RuleInput rule={numberInputRule} onInputChange={e => e.target} />,
    div
  );
});
it("renders without crashing - boolean", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <RuleInput
      rule={{ ...booleanInputRule, value: true }}
      onInputChange={e => e.target}
    />,
    div
  );
});
