import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  panelHeader: {
    minWidth: "60vw",
    margin: "0em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ({ theme }) => theme.colorPrimary,
    color: "black",
    padding: ".4em"
  }
});

const PanelHeader = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return <div className={classes.panelHeader}>{children}</div>;
};

PanelHeader.propTypes = {
  children: PropTypes.any
};

export default PanelHeader;
