import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    height: "min-content",
    margin: "0.5em",
    padding: "0.5em 1em",
    backgroundColor: "#A7C539",
    fontWeight: "bold",
    fontSize: "1em",
    boxShadow: "0px 6px 4px rgba(0,46,109,0.3)",
    border: "none",
    cursor: "pointer"
  }
});

const SwitchViewButton = props => {
  const classes = useStyles();
  return (
    <button className={classes.root} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
SwitchViewButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default SwitchViewButton;
