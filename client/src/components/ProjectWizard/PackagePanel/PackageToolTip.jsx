import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  accordionTooltipLabel: {
    border: "1px solid black",
    padding: "1em",
    borderRadius: "5px",
    width: "min-content",
    minWidth: "97%",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    marginBottom: "10px"
  },
  closeButton: {
    float: "right",
    padding: "4px 10px",
    fontSize: "16px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  triangle: {
    position: "relative",
    top: "0px",
    left: "20px",
    width: "0",
    height: "0",
    borderBottom: "6px solid black",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  triangleInner: {
    position: "relative",
    top: "1px",
    left: "-6px",
    width: "0",
    height: "0",
    borderBottom: "6px solid white",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  disabledDescription: {
    color: "rgba(15, 41, 64, 0.3)"
  }
});

const PackageTooltip = ({ children, setShowDescription }) => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      <div className={clsx(classes.triangle)}>
        <div className={clsx(classes.triangleInner)}></div>
      </div>
      <div
        className={clsx(classes.closeButton)}
        onClick={() => setShowDescription(prev => !prev)}
      >
        x
      </div>
      <div className={classes.accordionTooltipLabel}>{children}</div>
    </div>
  );
};

PackageTooltip.propTypes = {
  children: PropTypes.any,
  setShowDescription: PropTypes.func
};

export default PackageTooltip;
