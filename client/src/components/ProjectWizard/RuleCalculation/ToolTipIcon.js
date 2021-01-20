import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  tooltipIconContainer: {
    fontSize: 16,
    verticalAlign: "top",
    "&:hover": { cursor: "pointer" }
  }
});

const ToolTipIcon = () => {
  const classes = useStyles();
  return (
    <span className={clsx("fa-layers", "fa-fw", classes.tooltipIconContainer)}>
      <FontAwesomeIcon icon={faCircle} color="#a7c539" />
      <FontAwesomeIcon icon={faQuestion} color="white" transform="shrink-5" />
    </span>
  );
};

export default ToolTipIcon;
