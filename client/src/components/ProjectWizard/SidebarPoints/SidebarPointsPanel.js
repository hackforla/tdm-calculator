import React from "react";
import SidebarPoints from "./SidebarPoints";

const SidebarPointsPanel = props => {
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
           <SidebarPoints
            key={targetPointsRule.id}
            rule={targetPointsRule}
          />
           <SidebarPoints
            key={earnedPointsRule.id}
            rule={earnedPointsRule}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SidebarPointsPanel;
