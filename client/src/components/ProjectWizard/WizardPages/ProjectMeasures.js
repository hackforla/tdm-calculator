import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import WizardRuleStrategyPanels from "../WizardRuleStrategyPanels";

function ProjectMeasure(props) {
  const { rules, onInputChange, classes, onPkgSelect, uncheckAll } = props;

  
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
    <div>
      <h2 className="tdm-wizard-page-title">
        Transportation Demand Strategies
      </h2>
      <h3 className="tdm-wizard-page-subtitle">
        Select strategies to earn TDM points
      </h3>
      <div className={classes.unSelectContainer}>
        {showResidentialPkg ? (
          <button
            className="tdm-wizard-pkg-button"
            onClick={() => onPkgSelect("Residential")}
            disabled={disabledResidentialPkg}>
            Select Residential Package
          </button>
        ) : null}
        {showCommercialPkg ? (
          <button
            className="tdm-wizard-pkg-button"
            onClick={() => onPkgSelect("Commercial")}
            disabled={disabledCommercialPkg}>
            Select Commercial Package
          </button>
        ) : null}
        <button
          className={classes.unSelectButton}
          onClick={uncheckAll}>
          Reset Page
        </button>
      </div>
      <WizardRuleStrategyPanels
        rules={rules}
        onInputChange={onInputChange}
      />
    </div>
  );
}

export default ProjectMeasure;
