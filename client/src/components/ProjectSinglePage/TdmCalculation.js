import React from "react";
import { createUseStyles } from "react-jss";
import RulePanels from "./RulePanels";
import ResultList from "./ResultList";
import SwitchViewButton from "../SwitchViewButton";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto"
  },
  container: {
    margin: "1em"
  },
  switchButtonWrapper: {
    margin: "0.5em",
    display: "flex",
    flexDirection: "row"
  },
  switchButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: "20%"
  },
  rulePanelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rulePanel: {
    width: "50%",
    display: "flex",
    flexDirection: "column"
  },
  transportDemandStrategies: {
    width: "50%"
  },
  buttonWrapper: {
    textAlign: "center"
  }
});

const TdmCalculation = props => {
  const classes = useStyles();
  const { rules, onInputChange, onUncheckAll, filters, onPkgSelect, resultRuleCodes } = props;
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

  const showResidentialPkg = (() => {
    // Only show button if Pricing/Unbundling strategy is available
    const triggerRule = rules.filter(r => r.code === "STRATEGY_PARKING_1");
    return triggerRule[0] && triggerRule[0].display;
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
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.switchButtonWrapper}>
          <div
            className={classes.switchButton}>
            <SwitchViewButton onClick={props.onViewChange}>
              Switch to Wizard View
            </SwitchViewButton>
          </div>
          {rules && rules.length > 0 ? (
            <ResultList rules={resultRules} />
          ) : (
            <div>No Rules Loaded</div>
          )}
        </div>
        <div className={classes.rulePanelWrapper}>
          <div className={classes.rulePanel}>
            <h2>Project Parameters</h2>
            {rules && rules.length > 0 ? (
              <RulePanels rules={inputRules} onInputChange={onInputChange} />
            ) : (
              <div>No Rules Loaded</div>
            )}
          </div>
          <div className={classes.transportDemandStrategies}>
            <h2> Transportation Demand Strategies</h2>
            <div sclassName={classes.buttonWrapper}>>
              <button
                className='tdm-wizard-pkg-button'
                onClick={() => onUncheckAll(filters.strategyRules)}
              >
                Reset All Strategies
              </button>
              {showResidentialPkg ? (
                <button
                  className='tdm-wizard-pkg-button'
                  onClick={() => onPkgSelect("Residential")}
                  disabled={disabledResidentialPkg}
                >
                  Select Residential Package
                </button>
              ) : null}
              {showCommercialPkg ? (
                <button
                  className='tdm-wizard-pkg-button'
                  onClick={() => onPkgSelect("Commercial")}
                  disabled={disabledCommercialPkg}
                >
                  Select Commercial Package
                </button>
              ) : null}
            </div>
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
