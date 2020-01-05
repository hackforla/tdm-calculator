import React, { useState } from "react";
import WizardRulePanels from "./WizardRulePanels";
import WizardReviewPanel from "./WizardReviewPanel";
import WizardResultPanel from "./WizardResultPanel";
import WizardNavButton from "./WizardNavButton";
import SwitchViewButton from "./SwitchViewButton";

const TdmCalculation = props => {
  const { rules, onInputChange, resultRuleCodes } = props;
  const [page, setPage] = useState(0);
  const projectRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.calculationPanelId === 31 &&
        rule.used &&
        rule.display
    );

  const landUseRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.calculationPanelId === 5 &&
        rule.used &&
        rule.display
    );
  console.log(landUseRules);
  const inputRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.calculationPanelId !== 5 &&
        rule.calculationPanelId !== 31 &&
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
        className="tdm-wizard"
        style={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div className="tdm-wizard-sidebar">
          {rules && rules.length > 0 ? (
            <React.Fragment>
              <SwitchViewButton onClick={props.onViewChange}>
                Switch to Default View
              </SwitchViewButton>
              <WizardResultPanel rules={resultRules} />
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
            {rules && page === 0 ? (
              <div style={{ minWidth: "40%" }}>
                <h2 className="tdm-wizard-page-title">
                  {" "}
                  Welcome to Los Angeles' TDM Calculator
                </h2>
                <h3 className="tdm-wizard-page-subtitle">
                  First, let's name your project
                </h3>
                <WizardRulePanels
                  rules={projectRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : rules && page === 1 ? (
              <div style={{ minWidth: "40%" }}>
                <h2 className="tdm-wizard-page-title">
                  What kind of development is your project?
                </h2>
                <h3 className="tdm-wizard-page-subtitle">
                  Select all that apply
                </h3>
                <WizardRulePanels
                  rules={landUseRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 2 ? (
              <div style={{ minWidth: "80%" }}>
                <h2 className="tdm-wizard-page-title">
                  Determine the required parking spaces
                </h2>
                <h3 className="tdm-wizard-page-subtitle">
                  Enter the project specifications to determine the required
                  parking
                </h3>
                <WizardRulePanels
                  rules={inputRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 3 ? (
              <div style={{ minWidth: "80%" }}>
                <h2 className="tdm-wizard-page-title">
                  Calculate TDM Target Points
                </h2>
                <h3 className="tdm-wizard-page-subtitle">
                  Enter the # of parking spaces you intend to build to complete
                  the Target Point calculation
                </h3>
                <WizardRulePanels
                  rules={targetRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 4 ? (
              <div style={{ minWidth: "80%" }}>
                <h2 className="tdm-wizard-page-title">
                  Transporation Demand Measures
                </h2>
                <h3 className="tdm-wizard-page-subtitle">
                  Select measures to earn TDM points
                </h3>
                <WizardRulePanels
                  rules={measureRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : (
              <div>
                <WizardReviewPanel rules={rules} />
              </div>
            )}
          </div>
          <div style={{ marginBottom: "3em", marginTop: "2em" }}>
            <WizardNavButton
              disabled={page === 0}
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
