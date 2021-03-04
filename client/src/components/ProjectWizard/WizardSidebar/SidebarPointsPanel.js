import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SidebarPoints from "./SidebarPoints";
import SidebarProjectLevel from "./SidebarProjectLevel";
import EarnedPointsMetContainer from "./EarnedPointsMetContainer";

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

  const rulesConfig = {
    target: {
      value: rules[2].value
    },
    earned: {
      value: rules[3].value
    }
  };

  const target = rulesConfig.target.value;
  const earned = rulesConfig.earned.value;

  const targetPointsTipText = rules[2].description;
  const earnedPointsTipText = rules[3].description;

  const [earnedPointsMet, setEarnedPointsMet] = useState(false);

  useEffect(() => {
    if (earned >= target && target > 0) {
      setEarnedPointsMet(true);
    } else {
      setEarnedPointsMet(false);
    }
  }, [earned, target]);

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
          rulesConfig={rulesConfig}
          tipText={targetPointsTipText}
        />
        <SidebarPoints
          key={earnedPointsRule.id}
          rule={earnedPointsRule}
          rulesConfig={rulesConfig}
          tipText={earnedPointsTipText}
        />
      </div>
      {earnedPointsMet && <EarnedPointsMetContainer />}
    </React.Fragment>
  );
};

SidebarPointsPanel.propTypes = {
  rules: PropTypes.array
};

export default SidebarPointsPanel;
