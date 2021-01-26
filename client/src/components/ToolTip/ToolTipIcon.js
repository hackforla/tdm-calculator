import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { PropTypes } from "prop-types";

const useStyles = createUseStyles({
  tooltipIconContainer: {
    fontSize: ({ size }) => (size === "medium" ? 25 : 16),
    verticalAlign: ({ size }) => (size === "medium" ? "-.25em" : "top"),
    "&:hover": {
      cursor: "pointer"
    }
  },
  circle: {
    filter: "drop-shadow(0px 4px 2px rgba(0, 46, 109, 0.3))"
  }
});

const ToolTipIcon = ({ size = "small" }) => {
  const classes = useStyles({ size });
  return (
    <span className={clsx("fa-layers", "fa-fw", classes.tooltipIconContainer)}>
      <FontAwesomeIcon
        icon={faCircle}
        color="#a7c539"
        className={classes.circle}
      />
      <FontAwesomeIcon icon={faQuestion} color="white" transform="shrink-5" />
    </span>
  );
};

ToolTipIcon.propTypes = {
  size: PropTypes.string
};

export default ToolTipIcon;
