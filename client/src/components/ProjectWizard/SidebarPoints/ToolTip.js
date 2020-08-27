import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import ToolTipIcon from "./ToolTipIcon";

const useStyles = createUseStyles({
  tipIcon: {
    fontFamily: "Calibri",
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
    backgroundColor: "#A7C539",
    borderRadius: "50%",
    textAlign: "center",
    verticalAlign: "top",
    opacity: "1 !important",
    border: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tipText: {
    display: "none",
    padding: "15px",
    backgroundColor: "rgb(230, 234, 239)",
    width: "200px",
    fontFamily: "Arial",
    textAlign: "center",
    fontSize: 12,
    lineHeight: "16px",
    marginLeft: 20,
    fontWeight: "bold",
    "-webkit-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-moz-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-webkit-border-radius": 2,
    "-moz-border-radius": 2,
    borderRadius: 2,
    visibility: "hidden",
    opacity: 0,
    transition: "opacity 0.3s",
    "z-index": 1,
    "&.show": {
      display: "inline-block",
      position: "absolute !important",
      visibility: "visible !important",
      color: "rgb(30, 36, 63) !important",
      backgroundColor: "rgb(230, 234, 239) !important",
      opacity: "1 !important",
      textTransform: "none !important"
    }
  }
});

const ToolTip = ({ tipText }) => {
  const [tipVisibility, setTipVisibility] = useState(false);
  const classes = useStyles();
  /*eslint-disable */
  const handleHover = () => {
    setTipVisibility(!tipVisibility);
  };
  /*eslint-enable */
  const showTip = tipVisibility ? "show" : "";
  return (
    <React.Fragment>
      <span onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <ToolTipIcon
          containerStyle={{
            fontSize: 16,
            verticalAlign: "top",
            "&:hover": { cursor: "pointer" }
          }}
        />
      </span>
      <span className={clsx(classes.tipText, showTip)}>{tipText}</span>
    </React.Fragment>
  );
};

ToolTip.propTypes = {
  tipText: PropTypes.string.isRequired
};

export default ToolTip;
