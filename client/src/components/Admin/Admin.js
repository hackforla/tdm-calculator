import React, { useState, useEffect } from "react";
import * as ruleService from "../../services/rule.service";
import RuleViewContainer from "./RuleViewContainer";

const calculationId = 1;

const Admin = () => {
  const [rules, setRules] = useState([]);

  function handleRulesChange(rules) {
    setRules(rules);
  }

  useEffect(() => {
    ruleService
      .getByCalculationId(calculationId)
      .then(response => {
        handleRulesChange(response.data);
      })
      .catch(err => {
        console.error(JSON.stringify(err, null, 2));
      });
  }, []);

  const calculationRules =
    rules && rules.filter(rule => rule.category === "calculation");

  return (
    <div style={{ width: "90vw", padding: "1rem" }}>
      <h3>Admin</h3>
      <div>
        <h4>Calculation Rule</h4>
        {calculationRules && calculationRules.length > 0 ? (
          <RuleViewContainer rules={calculationRules} />
        ) : (
          <div>No Rules Loaded</div>
        )}
      </div>
    </div>
  );
};

export default Admin;
