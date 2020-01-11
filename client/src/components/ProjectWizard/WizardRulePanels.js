import React from "react";

import WizardRuleInputList from "./WizardRuleInputList";
import WizardRuleMeasureList from "./WizardRuleMeasureList";

const WizardRulePanels = props => {
  const { rules, suppressHeader } = props;
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
            <div
              key={rules[0].calculationPanelId}
              style={{
                margin: "0.5em"
              }}
            >
              {!suppressHeader ? <h4>{rules[0].panelName}</h4> : null}
              {rules[0].category === "input" ? (
                <WizardRuleInputList
                  key={rules[0].calculationPanelId}
                  rules={rules}
                  onInputChange={props.onInputChange}
                />
              ) : (
                <WizardRuleMeasureList
                  key={rules[0].calculationPanelId}
                  rules={rules}
                  onInputChange={props.onInputChange}
                />
              )}
            </div>
          ))
        : null}
    </React.Fragment>
  );
};

export default WizardRulePanels;
