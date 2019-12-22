import React from "react";

import RuleList from "./RuleList";

const RulePanels = props => {
  const { rules } = props;
  const panelIds = rules.reduce((acc, rule) => {
    if (!acc.includes(rule.calculationPanelId)) {
      acc.push(rule.calculationPanelId);
    }
    return acc;
  }, []);
  // Group rules into an array where each element is an array of
  // rules for a particular panel
  const panelsRules = panelIds.map(panelId => {
    return rules.filter(rule => rule.calculationPanelId === panelId);
  });
  return (
    <React.Fragment>
      {panelsRules && panelsRules.length > 0
        ? panelsRules.map(rules => (
            <fieldset
              key={rules[0].calculationPanelId}
              style={{
                margin: "0.75em"
              }}
            >
              <legend>
                <h4>{rules[0].panelName}</h4>{" "}
              </legend>
              <RuleList
                key={rules[0].calculationPanelId}
                rules={rules}
                onInputChange={props.onInputChange}
              />
            </fieldset>
          ))
        : null}
    </React.Fragment>
  );
};

export default RulePanels;
