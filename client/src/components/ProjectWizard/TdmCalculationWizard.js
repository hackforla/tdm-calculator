import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import WizardRuleStrategyPanels from "./WizardRuleStrategyPanels";
import WizardRuleInputPanels from "./WizardRuleInputPanels";
import WizardReviewPanel from "./WizardReviewPanel";
import WizardResultPanel from "./WizardResultPanel";
import WizardNavButton from "./WizardNavButton";
import SwitchViewButton from "../SwitchViewButton";
import Sidebar from "../Sidebar";

const useStyles = createUseStyles({
  root: {
    height: "calc(100vh - 103px)",
    overflow: "hidden",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row"
  },
  sidebarOverlay: {
    position: "absolute",
    background: "rgba(0, 46, 109, 0.65)",
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  sidebarContent: {
    zIndex: 1,
    display: "flex",
    flexDirection: "column"
  },
  contentContainer: {
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "calc(100vh - 103px)",
    overflow: "auto"
  },
  buttonWrapper: {
    textAlign: "center"
  },
  navButtonsWrapper: {
    marginBottom: "3em",
    marginTop: "2em"
  },
  unSelectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "32px"
  },
  unSelectButton: {
    position: "absolute",
    right: "24px",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

const TdmCalculationWizard = props => {
  const classes = useStyles();
  const {
    rules,
    onInputChange,
    onUncheckAll,
    filters,
    onPkgSelect,
    resultRuleCodes,
    account,
    projectId,
    loginId,
    onSave,
    onPageChange,
    pageNo
  } = props;
  const [page, setPage] = useState(0);
  const [unfilledRequired, setUnfilledRequired] = useState(false);

  useEffect(
    () => {
      if (
        !projectId ||
        (account && (account.isAdmin || account.id === loginId))
      ) {
        // Project Calculation is editable if it is not saved
        // or the project was created by the current logged in
        // user, or the logged in user is admin.
        setPage(pageNo || 1);
      } else {
        // read-only users can only see the summary page.
        setPage(6);
      }
    },
    [projectId, account, loginId, pageNo]
  );

  const projectRules = rules && rules.filter(filters.projectRules);
  const landUseRules = rules && rules.filter(filters.landUseRules);
  const inputRules = rules && rules.filter(filters.inputRules);
  const targetRules = rules && rules.filter(filters.targetRules);
  const strategyRules = rules && rules.filter(filters.strategyRules);
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
      <div className={clsx("tdm-wizard", classes.root)}>
        <Sidebar>
          {rules &&
            rules.length > 0 && (
              <div className={classes.sidebarContent}>
                <SwitchViewButton onClick={props.onViewChange}>
                  Switch to Default View
                </SwitchViewButton>
                <WizardResultPanel rules={resultRules} />
              </div>
            )}
        </Sidebar>
        <div
          className={clsx(
            "tdm-wizard-content-container",
            classes.contentContainer
          )}
        >
          <div>
            {rules && page === 1 ? (
              <div>
                <h1 className="tdm-wizard-page-title">
                  Welcome to Los Angeles' TDM Calculator
                </h1>
                <h3 className="tdm-wizard-page-subtitle">
                  First, let's name your project
                </h3>
                <WizardRuleInputPanels
                  rules={projectRules}
                  onInputChange={onInputChange}
                  suppressHeader={true}
                />
              </div>
            ) : rules && page === 2 ? (
              <div>
                <h1 className="tdm-wizard-page-title">
                  What kind of development is your project?
                </h1>
                <h3 className="tdm-wizard-page-subtitle">
                  Select all that apply
                </h3>
                <div className={classes.unSelectContainer}>
                  <button
                    className={classes.unSelectButton}
                    onClick={() => onUncheckAll(filters.landUseRules)}
                  >
                    Reset Page
                  </button>
                </div>
                <WizardRuleInputPanels
                  rules={landUseRules}
                  onInputChange={onInputChange}
                  suppressHeader={true}
                />
              </div>
            ) : page === 3 ? (
              <div>
                <h1 className="tdm-wizard-page-title">
                  Determine the required parking spaces
                </h1>
                <h3 className="tdm-wizard-page-subtitle">
                  Enter the project specifications to determine the required
                  parking
                </h3>
                <div className={classes.unSelectContainer}>
                  <button
                    className={classes.unSelectButton}
                    onClick={() => onUncheckAll(filters.inputRules)}
                  >
                    Reset Page
                  </button>
                </div>
                <WizardRuleInputPanels
                  rules={inputRules}
                  onInputChange={onInputChange}
                />
              </div>
            ) : page === 4 ? (
              <div>
                <h1 className="tdm-wizard-page-title">
                  Calculate TDM Target Points
                </h1>
                <h3 className="tdm-wizard-page-subtitle">
                  Enter the # of parking spaces you intend to build to complete
                  the Target Point calculation
                </h3>
                <WizardRuleInputPanels
                  rules={targetRules}
                  onInputChange={onInputChange}
                  suppressHeader
                />
              </div>
            ) : page === 5 ? (
              <div>
                <h2 className="tdm-wizard-page-title">
                  Transporation Demand Strategies
                </h2>
                <h3 className="tdm-wizard-page-subtitle">
                  Select strategies to earn TDM points
                </h3>
                <div className={classes.unSelectContainer}>
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
                  <button
                    className={classes.unSelectButton}
                    onClick={() => onUncheckAll(filters.strategyRules)}
                  >
                    Reset Page
                  </button>
                </div>
                <WizardRuleStrategyPanels
                  rules={strategyRules}
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
            <div className={classes.navButtonsWrapper}>
              <WizardNavButton
                disabled={page === 1}
                onClick={() => {
                  onPageChange(page - 1);
                }}
              >
                &lt;
              </WizardNavButton>
              <WizardNavButton
                disabled={page === 6 || unfilledRequired}
                onClick={() => {
                  onPageChange(page + 1);
                }}
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
