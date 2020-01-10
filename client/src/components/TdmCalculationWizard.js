import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import WizardRulePanels from "./WizardRulePanels";
import WizardReviewPanel from "./WizardReviewPanel";
import WizardResultPanel from "./WizardResultPanel";
import WizardNavButton from "./WizardNavButton";
import SwitchViewButton from "./SwitchViewButton";

const useStyles = createUseStyles({
  sidebarOverlay: {
    position: "absolute",
    background: "rgba(0, 46, 109, 0.65)",
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  sidebarContent: {
    zIndex: 1
  }
});

const TdmCalculationWizard = props => {
  const classes = useStyles();
  const {
    rules,
    onInputChange,
    onPkgSelect,
    resultRuleCodes,
    account,
    projectId,
    loginId,
    onSave,
    startPage
  } = props;
  const [page, setPage] = useState(startPage);

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

  const showResidentialPkg = (() => {
    // Only show button if one of the land uses is Residential
    const triggerRule = rules.filter(r => r.code === "LAND_USE_RESIDENTIAL");
    return triggerRule[0] && !!triggerRule[0].value;
  })();

  const showCommercialPkg = (() => {
    // Only show button if Parking Cash-Out strategy is available
    const triggerRule = rules.filter(r => r.code === "STRATEGY_PARKING_2");
    return triggerRule[0] && triggerRule[0].display;
  })();

  const disabledResidentialPkg = (() => {
    // Only enable button if
    // component strategies are not already selected
    const pkgRules = rules.filter(rule =>
      ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_1"].includes(
        rule.code
      )
    );

    const strategyCount = pkgRules.reduce(
      (count, r) => count + (!!r.value ? 1 : 0),
      0
    );
    return strategyCount === 3;
  })();

  const disabledCommercialPkg = (() => {
    // Only enable button if
    // component strategies are not already selected
    const pkgRules = rules.filter(rule =>
      ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_2"].includes(
        rule.code
      )
    );

    const strategyCount = pkgRules.reduce(
      (count, r) => count + (!!r.value ? 1 : 0),
      0
    );
    return strategyCount === 3;
  })();

  return (
    <React.Fragment>
      <div
        className="tdm-wizard"
        style={{
          flex: "1 1 auto%",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div className="tdm-wizard-sidebar">
          <div className={classes.sidebarOverlay}></div>
          {rules && rules.length > 0 && (
            <div className={classes.sidebarContent}>
              <SwitchViewButton onClick={props.onViewChange}>
                Switch to Default View
              </SwitchViewButton>
              <WizardResultPanel rules={resultRules} />
            </div>
          )}
        </div>
        <div className="tdm-wizard-content-container">
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
                  suppressHeader={true}
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
                  suppressHeader={true}
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
                  suppressHeader
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
                <div style={{ textAlign: "center" }}>
                  {showResidentialPkg ? (
                    <button
                      className="tdm-wizard-pkg-button"
                      onClick={() => onPkgSelect("Residential")}
                      disabled={disabledResidentialPkg}
                    >
                      Select Residential Package
                    </button>
                  ) : null}
                  {showCommercialPkg ? (
                    <button
                      className="tdm-wizard-pkg-button"
                      onClick={() => onPkgSelect("Commercial")}
                      disabled={disabledCommercialPkg}
                    >
                      Select Commercial Package
                    </button>
                  ) : null}
                </div>
                <WizardRulePanels
                  rules={measureRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : (
              <div>
                <WizardReviewPanel
                  rules={rules}
                  account={account}
                  projectId={projectId}
                  loginId={loginId}
                  onSave={onSave}
                />
              </div>
            )}
          </div>

          {!projectId || (account && account.id && account.id === loginId) ? (
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
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TdmCalculationWizard;
