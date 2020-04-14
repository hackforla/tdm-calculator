import React from "react";
import PropTypes from "prop-types";
import SidebarPoints from "./SidebarPoints";
import SidebarProjectLevel from "./SidebarProjectLevel";
import { withTheme } from "react-jss";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

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
  const targetPointsTipText = "Target Points Tool Tip";
  const earnedPointsTipText = "Earned Points Tool Tip";

  return (
    <React.Fragment>
      <div className="tdm-results-panel">
        <SidebarProjectLevel level={projectLevelRule.value} />
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
