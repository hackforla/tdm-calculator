import React, { useState } from "react";
import RuleView from "./RuleView";

const RulePanels = props => {
  const { rules } = props;
  const [ruleId, setRuleId] = useState(rules[0].id);

  return (
    <React.Fragment>
      <select value={ruleId} onChange={e => setRuleId(e.target.value)}>
        {rules && rules.length > 0
          ? rules.map(rule => (
              <option key={rule.id} value={rule.id}>
                {rule.code}
              </option>
            ))
          : null}
      </select>
      {rules && rules.length > 0
        ? rules.map(rule => (
            <div key={rule.id}>
              <RuleView rule={rule} onInputChange={props.onInputChange} />
            </div>
          ))
        : null}
    </React.Fragment>
  );
};

export default RulePanels;
