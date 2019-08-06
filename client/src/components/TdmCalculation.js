import React from "react";
import RulePanels from "./RulePanels";
import ResultList from "./ResultList";
import RuleViews from "./RuleViews";

const TdmCalculation = props => {
  const { rules, onInputChange, resultRuleCodes } = props;
  const inputRules =
    rules && rules.filter(rule => rule.category === "input" && rule.used);
  const measureRules =
    rules && rules.filter(rule => rule.category === "measure" && rule.used);
  const resultRules =
    rules && rules.filter(rule => resultRuleCodes.includes(rule.code));
  const calculationRules =
    rules && rules.filter(rule => rule.category === "calculation" && rule.used);
  return (
    <div>
      <div>
        <h3>Calculation Rules</h3>
          {calculationRules && calculationRules.length > 0 ? (
            <RuleViews rules={calculationRules} onInputChange={onInputChange} />
          ) : (
            <div>No Rules Loaded</div>
          )}
      </div>
      <div style={{ margin: "1em" }}>
        <div
          style={{
            margin: "0.5em"
          }}
        >
          {rules && rules.length > 0 ? (
            <ResultList rules={resultRules} />
          ) : (
            <div>No Rules Loaded</div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              width: "50%"
            }}
          >
            <h2>Project Parameters</h2>
            {rules && rules.length > 0 ? (
              <RulePanels rules={inputRules} onInputChange={onInputChange} />
            ) : (
              <div>No Rules Loaded</div>
            )}
          </div>
          <div
            style={{
              width: "50%"
            }}
          >
            <h2> Transportation Demand Strategies</h2>
            {rules && rules.length > 0 ? (
              <RulePanels rules={measureRules} onInputChange={onInputChange} />
            ) : (
              <div>No Rules Loaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TdmCalculation;
