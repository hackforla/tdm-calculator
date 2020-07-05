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
    border: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tipText: {
    display: "inline-block",
    backgroundColor: "#A7C539",
    color: "white",
    width: "160px",
    fontFamily: "Calibri",
    fontSize: "16px",
    textAlign: "center",
    padding: "5px 0",
    borderRadius: 6,
    position: "absolute",
    "z-index": 1,
    marginLeft: 20,
    visibility: "hidden",
    opacity: 0,
    transition: "opacity 0.3s",
    "&.showTip": {
      visibility: "visible",
      opacity: 1
    }
  }
});

const ToolTip = ({ tipText }) => {
  const [tipVisibility] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    //setTipVisibility(!tipVisibility);
  };
  const showTip = tipVisibility ? "showTip" : "";
  return (
    <React.Fragment>
      <ToolTipIcon
        containerStyle={{
          fontSize: 16,
          verticalAlign: "top",
          "&:hover": { cursor: "pointer" }
        }}
      />
      <span className={clsx(classes.tipText, showTip)}>{tipText}</span>
    </React.Fragment>
  );
};

ToolTip.propTypes = {
  tipText: PropTypes.string.isRequired
};

export default ToolTip;
