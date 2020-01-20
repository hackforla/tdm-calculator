import React from "react";
import WizardRuleStrategy from "./WizardRuleStrategy";

const WizardRuleStrategyList = props => {
  const { rules } = props;
  return (
    <div
      style={{ marginRight: ".75em", marginLeft: "0.75em", minWidth: "80%" }}
    >
      {rules && rules.length > 0
        ? rules.map(rule => (
            <WizardRuleStrategy
              key={rule.id}
              rule={rule}
              onInputChange={props.onInputChange}
            />
          ))
        : null}
    </div>
  );
};

export default WizardRuleStrategyList;
