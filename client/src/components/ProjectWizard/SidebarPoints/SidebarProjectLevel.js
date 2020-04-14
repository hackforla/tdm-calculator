import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Tooltip from "./ToolTip";

const useStyles = createUseStyles({
  projectLevelHeader: {
    color: "white",
    fontSize: 20,
    fontFamily: "Oswald",
    fontWeight: 500,
    textAlign: "center"
  },
  projectLevelValue: {
    color: "white",
    fontSize: 100,
    fontFamily: "Oswald",
    fontWeight: "bold",
    marginBottom: 0,
    textAlign: "center",
    lineHeight: "1.1em"
  },
  projectLevelContainer: {
    flex: 1
  }
});

const SidebarProjectLevel = ({ level }) => {
  const classes = useStyles();
  const tipText = "Project Level Toop Tip";
  return (
    <div className={classes.projectLevelContainer}>
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
