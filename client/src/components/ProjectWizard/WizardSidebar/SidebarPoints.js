import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import clsx from "clsx";
import ToolTip from "../../ToolTip/ToolTip";

const useStyles = createUseStyles({
  ruleTargetGreen: {
    fontSize: "80px",
    fontFamily: "Oswald, Calibri",
    fontWeight: "bold",
    marginBottom: 2,
    color: ({ theme }) => theme.colorPrimary
  },
  ruleEarnedOrange: {
    fontSize: "80px",
    fontFamily: "Oswald, Calibri",
    fontWeight: "bold",
    marginBottom: 2,
    color: ({ theme }) => theme.colorEarnedPoints
  },
  ruleName: {
    fontFamily: "Oswald, Calibri",
    fontSize: "16px",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    minWidth: "123px"
  },
  lowOpacity: {
    opacity: 0.4
  },
  noDisplay: {
    display: "none !important"
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  }
});

const SidebarPoints = props => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { rule, rulesConfig } = props;

  const opacityTest =
    rule.value && rule.value !== "0" ? "" : classes.lowOpacity;
  const noToolTip = rule.value === 0 ? classes.noDisplay : "";

  const target = rulesConfig.targetPointsRule.value;
  const earned = rulesConfig.earnedPointsRule.value;

  const earnedPointsColor =
    (rule.name === "Earned Points" && earned === 0) ||
    (rule.name === "Earned Points" && earned < target)
      ? classes.ruleEarnedOrange
      : classes.ruleTargetGreen;

  const targetPointsColor =
    rule.name === "Target Points"
      ? classes.ruleTargetGreen
      : classes.ruleEarnedOrange;

  return (
    <div className={clsx("tdm-calculation-metrics-panel-item", opacityTest)}>
      <div id={rule.code} className={earnedPointsColor || targetPointsColor}>
        {rule.value}
      </div>
      <h3 className={classes.ruleName}>
        {rule.name}

        <span
          className={clsx(classes.projectLevelContainer, noToolTip)}
          data-tip={rule.description}
          data-iscapture="true"
          data-html="true"
          data-class={classes.tooltip}
        >
          <ToolTipIcon />
        </span>
      </h3>
      <ToolTip />
    </div>
  );
};
SidebarPoints.propTypes = {
  rule: PropTypes.object.isRequired,
  rulesConfig: PropTypes.object.isRequired
};

export default SidebarPoints;
