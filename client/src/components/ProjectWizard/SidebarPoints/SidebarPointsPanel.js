import React from "react";
import PropTypes from "prop-types";
import SidebarPoints from "./SidebarPoints";
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
  console.log(projectLevelRule.value);
  return (
    <React.Fragment>
      <div style={{ color: "white", fontSize: 28 }}>
        Project Level: {projectLevelRule.value}
      </div>
      {rules && targetPointsRule.value ? (
        <div className="tdm-results-panel">
          <SidebarPoints key={targetPointsRule.id} rule={targetPointsRule} />
          <SidebarPoints key={earnedPointsRule.id} rule={earnedPointsRule} />
        </div>
      ) : null}
    </React.Fragment>
  );
};
SidebarPointsPanel.propTypes = {
  rules: PropTypes.array
};

export default SidebarPointsPanel;
