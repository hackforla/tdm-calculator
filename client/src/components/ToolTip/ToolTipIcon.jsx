import React from "react";
import { MdHelp } from "react-icons/md";
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
  help: {
    color: "#a7c539"
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

const ToolTipIcon = ({ size = "small", id, tooltipContent }) => {
  const classes = useStyles({ size });
  return (
    <span
      className={clsx("fa-layers", "fa-fw", classes.tooltipIconContainer)}
      data-class={classes.tooltip}
      data-for={id}
      data-tip={tooltipContent}
      data-iscapture="true"
      data-html="true"
    >
      <MdHelp className={classes.help} />
    </span>
  );
};

ToolTipIcon.propTypes = {
  size: PropTypes.string,
  id: PropTypes.string,
  tooltipContent: PropTypes.string
};

export default ToolTipIcon;
