import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

const useStyles = createUseStyles({
  projectLevelHeader: {
    color: "white",
    fontSize: 18,
    fontFamily: "Oswald, Calibri",
    fontWeight: 500,
    textAlign: "center",
    transition: "opacity 1s"
  },
  projectLevelValue: {
    color: "white",
    fontSize: 80,
    fontFamily: "Oswald, Calibri",
    fontWeight: "bold",
    marginBottom: "-12px",
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

const SidebarProjectLevel = ({ level, rules }) => {
  const classes = useStyles();
  const tipText = rules[0]?.description || "";

  return (
    <div
      className={clsx(
        classes.projectLevelContainer,
        level === 0 && classes.lowOpacity
      )}
    >
      <p id="PROJECT_LEVEL" className={classes.projectLevelValue}>
        {level}
      </p>
      <h3 className={classes.projectLevelHeader}>
        PROJECT LEVEL
        {level > 0 && (
          <span
            data-tooltip-id="sidebar-tooltip" // Associate tooltip with a unique ID
            style={{ cursor: "pointer" }}
          >
            <ToolTipIcon />
          </span>
        )}
      </h3>

      {/* Tooltip Component */}
      <Tooltip
        id="sidebar-tooltip"
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
        {tipText}
      </Tooltip>
    </div>
  );
};

SidebarProjectLevel.propTypes = {
  level: PropTypes.number.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SidebarProjectLevel;
