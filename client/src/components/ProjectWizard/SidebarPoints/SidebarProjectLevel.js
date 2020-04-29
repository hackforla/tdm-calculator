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
  }
});

const SidebarProjectLevel = ({ level }) => {
  const classes = useStyles();
  const tipText = "Project Level Toop Tip";
  const opacityTest = level === 0 ? classes.lowOpacity : "";
  return (
    <div className={clsx(classes.projectLevelContainer, opacityTest)}>
      <p className={classes.projectLevelValue}>{level}</p>
      <h3 className={classes.projectLevelHeader}>
        PROJECT LEVEL
        <Tooltip tipText={tipText} />
      </h3>
    </div>
  );
};

SidebarProjectLevel.propTypes = {
  level: PropTypes.number
};

export default SidebarProjectLevel;
