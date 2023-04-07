import React from "react";
import ReactDOM from "react-dom/client";
import RuleInput from "./RuleInput";
import {
  numberInputRule,
  booleanInputRule
} from "../../test-data/tdm-calc-rules";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.createRoot(div).render(
    <RuleInput rule={numberInputRule} onInputChange={e => e.target} />
  );
  expect(div).toBeDefined();
});

it("renders without crashing - boolean", () => {
  const div = document.createElement("div");
  ReactDOM.createRoot(div).render(
    <RuleInput
      rule={{ ...booleanInputRule, value: true }}
      onInputChange={e => e.target}
    />
  );
  expect(div).toBeDefined();
});
