import React from "react";
import WizardResultPanelItem from "./WizardResultPanelItem";

const WizardResultPanel = props => {
  const { rules } = props;
  let targetPointsRule = {};
  let earnedPointsRule = {};
  if (rules) {
    targetPointsRule = rules.filter(
      rule => rule.code === "TARGET_POINTS_PARK"
    )[0];
    earnedPointsRule = rules.filter(rule => rule.code === "PTS_EARNED")[0];
  }

  return (
    <React.Fragment>
      {rules ? (
        <div className="tdm-results-panel">
          <WizardResultPanelItem
            key={targetPointsRule.id}
            rule={targetPointsRule}
          />
          <WizardResultPanelItem
            key={earnedPointsRule.id}
            rule={earnedPointsRule}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default WizardResultPanel;
