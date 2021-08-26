import React, { useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import clsx from "clsx";

/* 
See https://css-tricks.com/building-progress-ring-quickly/

for explanation of operation
*/

const DIAL_RADIUS = 95;
const STROKE_WIDTH = 15;

const useStyles = createUseStyles({
  rotate: {
    transform: "rotate(75deg)"
  },
  progress: {
    transition: "stroke-dashoffset 18s"
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
  lowOpacity: {
    opacity: 0.4
  },
  noDisplay: {
    display: "none !important"
  }
});

const EarnedPointsProgress = props => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const controlRef = useRef(null);

  const { rulesConfig } = props;
  const radius = DIAL_RADIUS;
  const stroke = STROKE_WIDTH;

  const target = rulesConfig.targetPointsRule.value || 0;
  const earned = rulesConfig.earnedPointsRule.value || 0;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = Math.max(
    0,
    circumference - (earned / target) * 0.85 * circumference
  );

  return (
    <div
      ref={controlRef}
      className={
        target > 0
          ? "tdm-calculation-progress"
          : clsx("tdm-calculation-progress", classes.lowOpacity)
      }
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          zIndex: 4,
          fontFamily: "Oswald",
          fontSize: "48px",
          fontWeight: "700",
          color: "black",
          justifySelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          letter: "1%"
        }}
      >
        <div id={rulesConfig.earnedPointsRule.code}>{earned}</div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "24px"
          }}
        >
          EARNED
        </div>
      </div>
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          zIndex: 4,
          fontFamily: "Oswald",
          fontSize: "22px",
          fontWeight: "700",
          color: theme.colorDefault,
          justifySelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "99px",
          marginTop: "90px"
        }}
      >
        <div id={rulesConfig.targetPointsRule.code}>{target}</div>
        <div
          style={{
            fontSize: "14px"
          }}
        >
          TARGET
        </div>
      </div>
      <div
        data-tip={
          "<p>" +
          rulesConfig.earnedPointsRule.description +
          "</p><p>" +
          rulesConfig.targetPointsRule.description +
          "</p>"
        }
        data-iscapture="true"
        data-html="true"
        data-class={
          target > 0
            ? classes.tooltip
            : clsx(classes.tooltip, classes.noDisplay)
        }
        style={{
          gridRow: 1,
          gridColumn: 1,
          zIndex: 10,
          marginLeft: 170,
          marginTop: 45
        }}
      >
        <ToolTipIcon />
      </div>
      <svg
        className={classes.rotate}
        style={{
          width: radius * 2,
          height: radius * 2,
          gridColumn: "1",
          gridRow: "1",
          overflow: "visible"
        }}
      >
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
          r="28"
          cx="154"
          cy="61"
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

EarnedPointsProgress.propTypes = {
  rulesConfig: PropTypes.object
};

export default EarnedPointsProgress;
