import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ResultList from "./ResultList";
import { tdmRules } from "../test-data/tdm-calc-rules";
import "../styles/App.scss";

const rules = tdmRules
  .filter(rule => rule.calculationPanelId === 11)
  .sort((ruleA, ruleB) => {
    if (ruleA.displayOrder < ruleB.displayOrder) {
      return -1;
    } else if (ruleA.displayOrder > ruleB.displayOrder) {
      return 1;
    }
    return ruleA.name < ruleB.name ? -1 : ruleA.name > ruleB.name ? 1 : 0;
  })
  .filter((rule, index) => index < 4);

storiesOf("ResultList", module).add("default", () => (
  <ResultList rules={rules} />
));
