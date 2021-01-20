import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ToolTipIcon from "./ToolTipIcon";
import clsx from "clsx";

const useStyles = createUseStyles({
  projectLevelHeader: {
    color: "white",
    fontSize: 20,
    fontFamily: "Oswald, Calibri",
    fontWeight: 500,
    textAlign: "center",
    transition: "opacity 1s"
  },
  projectLevelValue: {
    color: "white",
    fontSize: 100,
    fontFamily: "Oswald, Calibri",
    fontWeight: "bold",
    marginBottom: 0,
    textAlign: "center",
    lineHeight: "1.1em"
  },
  projectLevelContainer: {
    flex: 1
  },
  lowOpacity: {
    opacity: 0.4
  },
  noDisplay: {
    display: "none !important"
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    "-webkit-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-moz-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-webkit-border-radius": 2,
    "-moz-border-radius": 2,
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  }
});

const SidebarProjectLevel = ({ level, rules }) => {
  const classes = useStyles();
  const tipText = rules[0].description;
  const opacityTest = level === 0 ? classes.lowOpacity : "";
  const noToolTip = level === 0 ? classes.noDisplay : "";

  return (
    <div className={clsx(classes.projectLevelContainer, opacityTest)}>
      <p className={classes.projectLevelValue}>{level}</p>
      <h3 className={classes.projectLevelHeader}>
        PROJECT LEVEL
        <span
          className={clsx(classes.projectLevelContainer, noToolTip)}
          data-tip={tipText}
          data-iscapture="true"
          data-html="true"
          data-class={classes.tooltip}
        >
          <ToolTipIcon
            containerStyle={{
              fontSize: 16,
              verticalAlign: "top",
              "&:hover": { cursor: "pointer" }
            }}
          />
        </span>
      </h3>
    </div>
  );
};

SidebarProjectLevel.propTypes = {
  level: PropTypes.number,
  rules: PropTypes.array
};

export default SidebarProjectLevel;
