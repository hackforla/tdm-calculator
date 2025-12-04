import React, { useContext /*, { useEffect, useState } */ } from "react";
import PropTypes from "prop-types";
import SidebarProjectLevel from "./SidebarProjectLevel";
// import EarnedPointsMetContainer from "./EarnedPointsMetContainer";
import SidebarPoints from "./SidebarPoints";
import EarnedPointsProgress from "./EarnedPointsProgress";
import SidebarCart from "./SidebarCart";
import ToolTip from "../../ToolTip/ToolTip";
import { createUseStyles } from "react-jss";
import ConfigContext from "../../../contexts/ConfigContext";

const useStyles = createUseStyles({
  resultsPanel: {
    display: "flex",
    flexDirection: "row-reverse",
    backgroundColor: "transparent",
    color: "white",
    flex: "0 1 25%",
    alignItems: "center",
    justifyContent: "center"
  },
  divider: {
    border: "none",
    borderTop: "3px dotted #e7ebf0",
    width: "100%"
  },
  calculationProgress: {
    flex: "0 1 25%",
    display: "flex",
    justifyContent: "center"
  },
  calculationCart: {
    flex: "1 0 50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#f7f9fa",
    fontFamily: "Oswald",
    padding: "10px",
    lineHeight: "1.5em",
    color: "#0f2940",
    overflowY: "scroll"
  }
});

//const USE_PROGRESS_DIAL = false;

const SidebarPointsPanel = props => {
  const classes = useStyles();
  const configContext = useContext(ConfigContext);
  const useProgressDial = configContext.SIDEBAR_STYLE !== "LEGACY";
  const { rules, strategyRules, page } = props;
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
      <div className={classes.resultsPanel}>
        <SidebarProjectLevel
          key={projectLevelRule.key}
          rule={projectLevelRule}
          level={projectLevelRule.value}
          rules={rules}
        />
      </div>
      <hr className={classes.divider} />
      {useProgressDial ? (
        <div className={classes.calculationProgress}>
          <EarnedPointsProgress
            key={targetPointsRule.id}
            rulesConfig={rulesConfig}
            style={{ flexBasis: "25%", flexGrow: 0 }}
          />
        </div>
      ) : (
        <>
          <div className={classes.resultsPanel}>
            <SidebarPoints
              key={targetPointsRule.id}
              rule={targetPointsRule}
              rulesConfig={rulesConfig}
              tipText={targetPointsRule.description}
            />
            <SidebarPoints
              key={earnedPointsRule.id}
              rule={earnedPointsRule}
              rulesConfig={rulesConfig}
              tipText={earnedPointsRule.description}
            />
          </div>
        </>
      )}

      <div
        style={
          earnedPointsRule && earnedPointsRule.value
            ? {}
            : { visibility: "hidden" }
        }
        className={classes.calculationCart}
      >
        <SidebarCart strategyRules={strategyRules} page={page} />
      </div>

      {/* {earnedPointsMet && <EarnedPointsMetContainer />} */}
      <ToolTip />
    </React.Fragment>
  );
};

SidebarPointsPanel.propTypes = {
  rules: PropTypes.array,
  strategyRules: PropTypes.array,
  page: PropTypes.number
};

export default SidebarPointsPanel;
