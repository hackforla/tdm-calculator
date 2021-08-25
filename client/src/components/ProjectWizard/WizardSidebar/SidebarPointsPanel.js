import React /*, { useEffect, useState } */ from "react";
import PropTypes from "prop-types";
// import SidebarPoints from "./SidebarPoints";
import SidebarProjectLevel from "./SidebarProjectLevel";
// import EarnedPointsMetContainer from "./EarnedPointsMetContainer";
import EarnedPointsProgress from "./EarnedPointsProgress";
import SidebarCart from "./SidebarCart";
// import ToolTip from "../../ToolTip/ToolTip";

const SidebarPointsPanel = props => {
  const { rules, strategyRules } = props;
  let targetPointsRule = {};
  let earnedPointsRule = {};
  let projectLevelRule = {};
  if (rules) {
    targetPointsRule = rules.find(rule => rule.code === "TARGET_POINTS_PARK");
    earnedPointsRule = rules.find(rule => rule.code === "PTS_EARNED");
    projectLevelRule = rules.find(rule => rule.code === "PROJECT_LEVEL");
  }

  // const targetPoints = targetPointsRule ? targetPointsRule.value : null;
  // const earnedPoints = earnedPointsRule ? earnedPointsRule.value : null;
  const rulesConfig = { targetPointsRule, earnedPointsRule };

  // const [earnedPointsMet, setEarnedPointsMet] = useState(false);

  // useEffect(() => {
  //   setEarnedPointsMet(earnedPoints >= targetPoints && targetPoints > 0);
  // }, [earnedPoints, targetPoints]);

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
      {/* <hr className="tdm-divider" /> */}
      {/* <div className="tdm-results-panel">
        <SidebarPoints
          key={targetPointsRule.id}
          rule={targetPointsRule}
          rulesConfig={rulesConfig}
          tipText={targetPointsRuleDescription}
        />
        <SidebarPoints
          key={earnedPointsRule.id}
          rule={earnedPointsRule}
          rulesConfig={rulesConfig}
          tipText={earnedPointsRule.desccription}
        />
      </div> */}
      <div className="tdm-calculation-progress">
        <EarnedPointsProgress
          key={targetPointsRule.id}
          rulesConfig={rulesConfig}
        />
      </div>

      <div
        style={
          earnedPointsRule && earnedPointsRule.value
            ? {}
            : { visibility: "hidden" }
        }
        className="tdm-calculation-cart"
      >
        <SidebarCart strategyRules={strategyRules} />
      </div>

      {/* {earnedPointsMet && <EarnedPointsMetContainer />} */}
      {/* <ToolTip /> */}
    </React.Fragment>
  );
};

SidebarPointsPanel.propTypes = {
  rules: PropTypes.array,
  strategyRules: PropTypes.array
};

export default SidebarPointsPanel;
