import React from "react";
import RuleViews from "./RuleViews";

// TODO move retrieval of rules to App.js

const Admin = (props) => {
  const { rules, onInputChange, resultRuleCodes } = props;
  const calculationRules =
    rules &&
    rules.filter(rule => rule.category === "calculation" && rule.used);
  return (
    <div>
      <h3>Admin</h3>
      <div>
        <h4>Calculation Rules</h4>
        {calculationRules && calculationRules.length > 0 ? (
          <RuleViews rules={calculationRules} onInputChange={onInputChange} />
        ) : (
          <div>No Rules Loaded</div>
        )}
      </div>
    </div>
  );
}

export default Admin;