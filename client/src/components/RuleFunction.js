import React from "react";

const RuleFunction = props => {
  const { functionBody } = props;

  return (
    <React.Fragment>
      <pre>{functionBody}</pre>
    </React.Fragment>
  );
};

export default RuleFunction;
