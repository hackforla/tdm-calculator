import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Tooltip from "./ToolTip";
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
        <span className={clsx(classes.projectLevelContainer, noToolTip)}>
          <Tooltip tipText={tipText} />
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
