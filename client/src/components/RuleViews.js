import React from "react";

import RuleView from "./RuleView";

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
      {rules && rules.length > 0
        ? rules.map(rule => (
            <div
              key={rule.id}
            >
              <RuleView rule={rule} onInputChange={props.onInputChange} />
            </div>
          ))
        : null}
    </React.Fragment>
  );
};

export default RulePanels;
