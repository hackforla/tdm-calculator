import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdWarning } from "react-icons/md";

const useStyles = createUseStyles({
  container: {
    color: "#B63920",
    fontFamily: "Calibri, Arial, sans-serif",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, .2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: "1 !important",
    padding: "0 0.5em !important",
    backgroundColor: "#F9DFDA",
    position: "absolute",
    top: "6.7em",
    right: "1.2em",
    fontSize: "1em",
    border: "1px solid #B63920"
  },
  containerHidden: {
    visibility: "hidden",
    position: "absolute"
  },
  button: {
    border: "none",
    color: "gray",
    fontSize: "16px",
    margin: "0 0 1em 1em",
    cursor: "pointer",
    backgroundColor: "#F9DFDA"
  },
  warningIcon: {
    objectFit: "none",
    margin: "1em",
    opacity: "1 !important"
  },
  underLined: {
    textDecoration: "underline"
  },
  arrowUp: {
    top: "-0.7em",
    right: "1em",
    width: "20px",
    height: "20px",
    borderLeft: "1px solid #B63920",
    borderBottom: "1px solid #B63920",
    backgroundColor: "#F9DFDA",
    position: "absolute",
    transform: `rotate(135deg)`,
    webkitTransform: `rotate(135deg)`
  }
});

const NavBarToolTip = () => {
  const [tooltipVisibility, toggleVisibility] = useState("container");
  const classes = useStyles();

  return (
    <div className={classes[tooltipVisibility]}>
      <MdWarning className={classes.warningIcon} alt="Warning" />
      <span>Only projects created after logging in can be saved</span>
      <div className={classes.arrowUp}> </div>
      <button
        onClick={() => {
          toggleVisibility("containerHidden");
        }}
        className={classes.button}
      >
        X
      </button>
    </div>
  );
};

NavBarToolTip.propTypes = {
  account: PropTypes.object
};

export default NavBarToolTip;
