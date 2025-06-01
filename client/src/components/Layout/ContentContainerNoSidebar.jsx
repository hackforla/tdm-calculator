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
  },
  outerDiv: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyItems: "flex-start",
    minHeight: "inherit"
  },
  contentDiv: {
    flexBasis: "75%",
    flexShrink: 1,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    paddingBottom: "10px"
  }
});

const ContentContainerNoSidebar = ({ children, contentContainerRef }) => {
  const classes = useStyles();

  return (
    <div className={classes.contentContainer}>
      <div className={classes.outerDiv}>
        <div className={classes.contentDiv} ref={contentContainerRef}>
          {children}
        </div>
      </div>
    </div>
  );
};
ContentContainerNoSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  contentContainerRef: PropTypes.object
};

export default ContentContainerNoSidebar;
