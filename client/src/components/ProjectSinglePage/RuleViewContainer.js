import React, { useState } from "react";
import RuleView from "./RuleView";

const RuleViewContainer = props => {
  const { rules } = props;
  const [ruleId, setRuleId] = useState(rules[0].id);
  const rule = rules.filter(rule => rule.id === ruleId)[0];

  return (
    <React.Fragment>
      <select
        value={ruleId}
        onChange={e => setRuleId(parseInt(e.target.value))}
      >
        {rules && rules.length > 0
          ? rules.map(rule => (
              <option key={rule.id} value={rule.id}>
                {rule.code}
              </option>
            ))
          : null}
      </select>
      <RuleView rule={rule} rules={rules} setRuleId={setRuleId} />
    </React.Fragment>
  );
};

export default RuleViewContainer;
