import React from "react";
import RuleInput from "./RuleInput";

const RuleList = props => {
  const { rules } = props;
  return (
    <React.Fragment>
      {rules && rules.length > 0
        ? rules.map(rule => (
            <RuleInput
              key={rule.id}
              rule={rule}
              onInputChange={props.onInputChange}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default RuleList;
