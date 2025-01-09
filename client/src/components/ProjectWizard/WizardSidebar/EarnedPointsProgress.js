import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

/* 
See https://css-tricks.com/building-progress-ring-quickly/

for explanation of operation
*/

const DIAL_RADIUS = 105;
const STROKE_WIDTH = 18;

const useStyles = createUseStyles({
  container: {
    flexBasis: "25%",
    flexGrow: 0,
    margin: 0,
    padding: "0.5em",
    backgroundColor: "transparent",
    color: ({ theme }) => theme.color$colorBackground,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    justifyContent: "center",
    alignItems: "center"
  },
  earnedPointsValue: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 4,
    fontFamily: "Oswald",
    fontSize: "76px",
    fontWeight: "700",
    color: ({ theme }) => theme.colorLADOT,
    justifySelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    letter: "1%",
    marginBottom: "18px"
  },
  earnedPointsLabel: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "20px"
  },
  targetPointsValue: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 4,
    fontFamily: "Oswald",
    fontSize: "38px",
    fontWeight: "700",
    color: ({ theme }) => theme.colorLADOT,
    justifySelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "116px",
    marginTop: "106px"
  },
  targetPointsLabel: { fontSize: "14px" },
  rotate: {
    transform: "rotate(65deg)"
  },
  progress: {
    transition: "stroke-dashoffset 18s"
  },
  tooltipIcon: {
    gridRow: 1,
    gridColumn: 1,
    zIndex: 10,
    marginLeft: 190,
    marginTop: 45
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
  },
  dial: {
    width: DIAL_RADIUS * 2,
    height: DIAL_RADIUS * 2,
    gridColumn: "1",
    gridRow: "1",
    overflow: "visible"
  },
  lowOpacity: {
    opacity: 0.4
  },
  noDisplay: {
    display: "none !important"
  }
});

// const EarnedPointsProgress = props => {
//   const theme = useTheme();
//   const classes = useStyles({ theme });

//   const { rulesConfig } = props;
//   const radius = DIAL_RADIUS;
//   const stroke = STROKE_WIDTH;

//   const target = rulesConfig.targetPointsRule.value || 0;
//   const earned = rulesConfig.earnedPointsRule.value || 0;

//   const normalizedRadius = radius - stroke * 2;
//   const circumference = normalizedRadius * 2 * Math.PI;
//   const strokeDashoffset = Math.max(
//     0,
//     target ? circumference - (earned / target) * 0.875 * circumference : 0
//   );
const EarnedPointsProgress = ({ rulesConfig }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const radius = DIAL_RADIUS;
  const stroke = STROKE_WIDTH;

  const target = rulesConfig.targetPointsRule.value || 0;
  const earned = rulesConfig.earnedPointsRule.value || 0;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = Math.max(
    0,
    target ? circumference - (earned / target) * 0.875 * circumference : 0
  );

  return (
    <div
      className={
        target > 0
          ? classes.container
          : clsx(classes.container, classes.lowOpacity)
      }
    >
      <div className={classes.earnedPointsValue}>
        <div id={rulesConfig.earnedPointsRule.code}>{earned}</div>
        <div className={classes.earnedPointsLabel}>EARNED</div>
      </div>
      <div className={classes.targetPointsValue}>
        <div id={rulesConfig.targetPointsRule.code}>{target}</div>
        <div className={classes.targetPointsLabel}>TARGET</div>
      </div>
      <div
        data-tooltip-content={
          "<p>Earned Points: " +
          rulesConfig.earnedPointsRule.description +
          "</p><p>Target Points: " +
          rulesConfig.targetPointsRule.description +
          "</p>"
        }
        className={clsx(
          classes.tooltipIcon,
          target > 0 ? "" : classes.noDisplay
        )}
      >
        <span
          data-tooltip-id="earned-points-tooltip" // Associate tooltip with a unique ID
          style={{ cursor: "pointer" }}
        >
          <ToolTipIcon />
        </span>
        <Tooltip
          id="earned-points-tooltip"
          place="right"
          offset={{ top: 0, left: 10 }}
          style={{
            color: "rgb(30, 36, 63)",
            backgroundColor: "white",
            padding: "15px",
            minWidth: "200px",
            maxWidth: "400px",
            fontFamily: "Arial",
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: "bold",
            boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
            borderRadius: "2px"
          }}
        >
          {`<p>Earned Points: ${rulesConfig.earnedPointsRule.description}</p>
      <p>Target Points: ${rulesConfig.targetPointsRule.description}</p>`}
        </Tooltip>
      </div>
      <svg className={clsx(classes.rotate, classes.dial)}>
        <circle
          stroke="#CFCFCF"
          fill={theme.colorDefault}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={
            earned / target >= 1
              ? theme.colorPrimary
              : earned / target >= 0.01
              ? theme.colorEarnedPoints
              : theme.colorDisabled
          }
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          strokeLinecap="round"
          style={{
            strokeDashoffset
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={theme.colorPrimary}
          fill={theme.colorPrimary}
          r="34"
          cx="178"
          cy="76"
          style={{
            gridColumn: 1,
            gridRow: 1,
            zIndex: -1
          }}
        />
      </svg>
    </div>
  );
};

// EarnedPointsProgress.propTypes = {
//   rulesConfig: PropTypes.object
// };
EarnedPointsProgress.propTypes = {
  rulesConfig: PropTypes.shape({
    targetPointsRule: PropTypes.shape({
      value: PropTypes.number,
      code: PropTypes.string,
      description: PropTypes.string
    }).isRequired,
    earnedPointsRule: PropTypes.shape({
      value: PropTypes.number,
      code: PropTypes.string,
      description: PropTypes.string
    }).isRequired
  }).isRequired
};

export default EarnedPointsProgress;
