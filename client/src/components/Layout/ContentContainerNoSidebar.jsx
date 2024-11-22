import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "calc(100vh - 71px - 5em)",
    margin: "auto",
    width: "100%"
  }
});

const ContentContainerNoSidebar = ({ children, contentContainerRef }) => {
  const classes = useStyles();

  return (
    <div className={classes.contentContainer} ref={contentContainerRef}>
      {children}
    </div>
  );
};
ContentContainerNoSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  contentContainerRef: PropTypes.object
};

export default ContentContainerNoSidebar;
