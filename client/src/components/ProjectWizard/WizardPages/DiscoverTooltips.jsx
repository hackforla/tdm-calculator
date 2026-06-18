import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { MdInfo } from "react-icons/md";

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
  },
  infoIcon: {
    color: theme.colorLADOT
  },
}));
const DiscoverTooltips = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.container}>
      <p className={classes.title}>
        If you want to know more about a term, hover over it and click the icon<MdInfo className={classes.infoIcon} /> for more information.
      </p>
    </div>
  );
};

export default DiscoverTooltips;
