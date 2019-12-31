import React, { useState } from "react";
import WizardRulePanels from "./WizardRulePanels";
import WizardReviewPanel from "./WizardReviewPanel";
import ResultPanel from "./ResultPanel";
import WizardNavButton from "./WizardNavButton";

const TdmCalculation = props => {
  const { rules, onInputChange, resultRuleCodes } = props;
  const [page, setPage] = useState(1);
  const landUseRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.calculationPanelId === 5 &&
        rule.used &&
        rule.display
    );
  const inputRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.calculationPanelId !== 5 &&
        rule.used &&
        rule.display
    );
  const targetRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "measure" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId === 10
    );
  const measureRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "measure" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId !== 10
    );
  const resultRules =
    rules &&
    rules.filter(rule => resultRuleCodes.includes(rule.code) && rule.display);

  return (
    <React.Fragment>
      <div
        style={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div className="tdm-wizard-sidebar">
          {rules && rules.length > 0 ? (
            <React.Fragment>
              <WizardNavButton onClick={props.onViewChange}>
                Switch to Default View
              </WizardNavButton>
              <ResultPanel rules={resultRules} />
            </React.Fragment>
          ) : (
            <div>No Rules Loaded</div>
          )}
        </div>
        <div
          style={{
            flexBasis: "80%",
            flexGrow: 1,
            flexShrink: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            overflowY: "scroll"
          }}
        >
          <div>
            {rules && page === 1 ? (
              <div style={{ minWidth: "40%" }}>
                <h2>Land Use</h2>
                <WizardRulePanels
                  rules={landUseRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 2 ? (
              <div style={{ width: "80%" }}>
                <h2>Project Parameters</h2>
                <WizardRulePanels
                  rules={inputRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 3 ? (
              <div>
                <h2> TDM Target Point Calculation</h2>

                <WizardRulePanels
                  rules={targetRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 4 ? (
              <div>
                <h2> Transportation Demand Strategies</h2>

                <WizardRulePanels
                  rules={measureRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : (
              <div style={{ width: "80%" }}>
                <h2> Project TDM Summary</h2>
                <WizardReviewPanel rules={rules} />
              </div>
            )}
          </div>
          <div style={{ marginBottom: "3em", marginTop: "2em" }}>
            <WizardNavButton
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              &lt;
            </WizardNavButton>
            <WizardNavButton
              disabled={page === 5}
              onClick={() => setPage(page + 1)}
            >
              &gt;
            </WizardNavButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TdmCalculation;
