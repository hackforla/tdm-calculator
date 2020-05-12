import React, { useState } from "react";
import PropTypes from "prop-types";
import RuleStrategyPanels from "../RuleStrategy/RuleStrategyPanels";
import InfoBox from "../InfoBox";
import ToolTipIcon from "../SidebarPoints/ToolTipIcon";

function ProjectMeasure(props) {
  const {
    rules,
    landUseRules,
    onInputChange,
    onCommentChange,
    classes,
    onPkgSelect,
    uncheckAll,
  } = props;

  const [displayInfoBox, setDisplayInfoBox] = useState(true);

  const showResidentialPkg = (() => {
    // Only show button if one of the land uses is Residential
    const triggerRule = landUseRules.filter(
      (r) => r.code === "LAND_USE_RESIDENTIAL"
    );
    return triggerRule[0] && !!triggerRule[0].value;
  })();

  const showEmploymentPkg = (() => {
    // Only show button if Parking Cash-Out strategy is available
    const triggerRule = rules.filter((r) => r.code === "STRATEGY_PARKING_2");
    return triggerRule[0] && triggerRule[0].display;
  })();

  const disabledResidentialPkg = (() => {
    // Only enable button if
    // component strategies are not already selected
    const pkgRules = rules.filter((rule) =>
      ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_1"].includes(
        rule.code
      )
    );

    const strategyCount = pkgRules.reduce(
      (count, r) => count + (r.value ? 1 : 0),
      0
    );
    return strategyCount === 3;
  })();

  const disabledEmploymentPkg = (() => {
    // Only enable button if
    // component strategies are not already selected
    const pkgRules = rules.filter((rule) =>
      ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_2"].includes(
        rule.code
      )
    );

    const strategyCount = pkgRules.reduce(
      (count, r) => count + (r.value && r.value !== "0" ? 1 : 0),
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
      <InfoBox
        displayStatus={displayInfoBox}
        handleClick={() => setDisplayInfoBox(false)}
      >
        <ToolTipIcon /> For detailed information, hover the mouse cursor over
        the terminology.
      </InfoBox>
      <div className={classes.unSelectContainer}>
        <button
          onClick={() => setDisplayInfoBox(true)}
          style={{
            height: 30,
            padding: 0,
            margin: 0,
            backgroundColor: "transparent",
            borderStyle: "none",
            cursor: "pointer",
          }}
        >
          <ToolTipIcon
            circleStyle={{
              filter: "drop-shadow(0px 4px 2px rgba(0, 46, 109, 0.3))",
            }}
            handleClick={() => setDisplayInfoBox(false)}
          />
        </button>
        {showResidentialPkg ? (
          <button
            className="tdm-wizard-pkg-button"
            onClick={() => onPkgSelect("Residential")}
            disabled={disabledResidentialPkg}
          >
            Select Residential Package
          </button>
        ) : null}
        {showEmploymentPkg ? (
          <button
            className="tdm-wizard-pkg-button"
            onClick={() => onPkgSelect("Employment")}
            disabled={disabledEmploymentPkg}
          >
            Select Employment Package
          </button>
        ) : null}
        <button className={classes.unSelectButton} onClick={uncheckAll}>
          Reset Page
        </button>
      </div>
      <RuleStrategyPanels
        rules={rules}
        onInputChange={onInputChange}
        onCommentChange={onCommentChange}
      />
    </div>
  );
}
ProjectMeasure.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      calculationPanelId: PropTypes.number.isRequired,
      panelName: PropTypes.string.isRequired,
      calcUnits: PropTypes.string,
    })
  ).isRequired,
  landUseRules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onPkgSelect: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
};

export default ProjectMeasure;
