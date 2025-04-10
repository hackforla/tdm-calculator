import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  container: {
    width: "calc((100% / 14.5) * 3);",
    background: theme.colors.secondary.lightGray,
    padding: "1em",
    position: "absolute",
    textAlign: "initial"
  },
  title: {
    flexGrow: "1",
    flexBasis: "50%",
    flexShrink: "1",
    fontFamily: "Calibri",
    fontWeight: 700
  }
}));
const DiscoverTooltips = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
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
