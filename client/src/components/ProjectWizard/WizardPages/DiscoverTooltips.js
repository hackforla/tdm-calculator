import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "250px",
    background: "#e9e9f1",
    padding: "1em",
    paddingBottom: "0",
    position: "absolute",
    left: "23.5px",
    textAlign: "initial"
  },
  title: {
    flexGrow: "1",
    flexBasis: "50%",
    flexShrink: "1",
    fontFamily: "Calibri Bold"
  }
});

const DiscoverTooltips = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p className={classes.title}>
        Try hovering over a term you want more information on. If the words
        become underlined and bold, you can click for a description. Hovering
        over a green question mark will also provide more information.
      </p>
    </div>
  );
};

export default DiscoverTooltips;
