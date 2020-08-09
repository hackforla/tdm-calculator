import React from "react";
import PropTypes from "prop-types";
import SidebarPoints from "./SidebarPoints";
import SidebarProjectLevel from "./SidebarProjectLevel";

const SidebarPointsPanel = props => {
  const { rules } = props;
  let targetPointsRule = {};
  let earnedPointsRule = {};
  let projectLevelRule = {};
  if (rules) {
    targetPointsRule = rules.filter(
      rule => rule.code === "TARGET_POINTS_PARK"
    )[0];
    earnedPointsRule = rules.filter(rule => rule.code === "PTS_EARNED")[0];
    projectLevelRule = rules.filter(rule => rule.code === "PROJECT_LEVEL")[0];
  }
  const targetPointsTipText = rules[2].description;
  const earnedPointsTipText = rules[3].description;

  return (
    <React.Fragment>
      <div className="tdm-results-panel">
        <SidebarProjectLevel
          key={projectLevelRule.key}
          rule={projectLevelRule}
          level={projectLevelRule.value}
          rules={rules}
        />
      </div>
      <hr className="tdm-divider" />
      <div className="tdm-results-panel">
        <SidebarPoints
          key={targetPointsRule.id}
          rule={targetPointsRule}
          tipText={targetPointsTipText}
        />
        <SidebarPoints
          key={earnedPointsRule.id}
          rule={earnedPointsRule}
          tipText={earnedPointsTipText}
        />
      </div>
    </React.Fragment>
  );
};
SidebarPointsPanel.propTypes = {
  rules: PropTypes.array
};

export default SidebarPointsPanel;
