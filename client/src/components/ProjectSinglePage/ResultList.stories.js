import React from "react";
import { storiesOf } from "@storybook/react";
import ResultList from "./ResultList";
import { tdmRules } from "../../test-data/tdm-calc-rules";

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

storiesOf("SinglePageResultList", module).add("default", () => (
  <ResultList rules={rules} />
));
