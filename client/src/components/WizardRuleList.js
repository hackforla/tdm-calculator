import React from "react";
import WizardRuleInput from "./WizardRuleInput";

const WizardRuleList = props => {
  const { rules } = props;
  return (
    <div
      style={{ marginRight: ".75em", marginLeft: "0.75em", minWidth: "80%" }}
    >
      {rules && rules.length > 0
        ? rules.map(rule => (
            <WizardRuleInput
              key={rule.id}
              rule={rule}
              onInputChange={props.onInputChange}
            />
          ))
        : null}
    </div>
  );
};

export default WizardRuleList;
