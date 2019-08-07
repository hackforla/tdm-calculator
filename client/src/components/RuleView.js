import React from "react";
import RuleFunction from "./RuleFunction";

const RuleView = props => {
  const { rule, rules, setRuleId } = props;
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "97%",
          margin: "0.5em",
          padding: "0.5em",
          backgroundColor: "lightGray",
          borderRadius: "0.5em"
        }}
      >
        <h3>{rule.name}</h3>
        <h4>Rule Code: {rule.code}</h4>
        <div
          style={{
            width: "70%",
            minHeight: "5em",
            maxHeight: "none",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <RuleFunction functionBody={rule.functionBody} rules={rules} setRuleId={setRuleId}/>
        </div>
        <div style={{ display: "flex" }}>
          <button>Validate</button>
          <button>Update</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RuleView;
