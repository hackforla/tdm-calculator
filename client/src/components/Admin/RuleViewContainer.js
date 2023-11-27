import React, { useState } from "react";
import PropTypes from "prop-types";
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
RuleViewContainer.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      filter: PropTypes.string.isRequired,
      length: PropTypes.number.isRequired
    })
  )
};

export default RuleViewContainer;
