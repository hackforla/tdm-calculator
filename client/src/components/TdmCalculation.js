import React from "react";
import RulePanels from "./RulePanels";
import ResultList from "./ResultList";

const TdmCalculation = props => {
  const { rules, onInputChange, resultRuleCodes } = props;
  const inputRules =
    rules &&
    rules.filter(
      rule => rule.category === "input" && rule.used && rule.display
    );
  const measureRules =
    rules &&
    rules.filter(
      rule => rule.category === "measure" && rule.used && rule.display
    );
  const resultRules =
    rules &&
    rules.filter(rule => resultRuleCodes.includes(rule.code) && rule.display);
  return (
    <div>
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
