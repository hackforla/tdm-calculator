import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    maxHeight: "2em",
    paddingLeft: "1em",
    paddingRight: "1em",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    backgroundColor: "#A7C539",
    margin: "0.5em",
    fontWeight: "bold",
    fontSize: "1em",
    boxShadow: "0px 6px 4px rgba(0,46,109,0.3)",
    textAlign: "center"
  }
});

const SwitchViewButton = props => {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default SwitchViewButton;
