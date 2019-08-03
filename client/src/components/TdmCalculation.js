import React from "react";
import RulePanels from "./RulePanels";
import ResultList from "./ResultList";

const TdmCalculation = props => {
  const { rules, onInputChange, resultRuleCodes } = props;
  const inputRules =
    rules && rules.filter(rule => rule.category === "input" && rule.used);
  const measureRules =
    rules && rules.filter(rule => rule.category === "measure" && rule.used);
  const resultRules =
    rules && rules.filter(rule => resultRuleCodes.includes(rule.code));
  return (
    <div style={{ margin: "1em" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#F8F8F8"
        }}
      >
        <div
          style={{
            width: "40%",
            margin: "0.5em"
          }}
        >
          <h3>Project Parameters</h3>
          {rules && rules.length > 0 ? (
            <RulePanels rules={inputRules} onInputChange={onInputChange} />
          ) : (
            <div>No Rules Loaded</div>
          )}
        </div>
        <div
          style={{
            width: "30%",
            margin: "0.5em"
          }}
        >
          <h3> Transportation Demand Strategies</h3>
          {rules && rules.length > 0 ? (
            <RulePanels rules={measureRules} onInputChange={onInputChange} />
          ) : (
            <div>No Rules Loaded</div>
          )}
        </div>
        <div
          style={{
            width: "30%",
            margin: "0.5em"
          }}
        >
          <h3> Metrics</h3>
          {rules && rules.length > 0 ? (
            <ResultList rules={resultRules} />
          ) : (
            <div>No Rules Loaded</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TdmCalculation;
