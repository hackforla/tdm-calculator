import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  sidebarContainer: {
    margin: "0",
    flexBasis: "387px",
    flexGrow: 0,
    flexShrink: 1,
    backgroundImage: "url(/assets/sidebarBackground.jpg)",
    backgroundPosition: "0 0",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  overlay: {
    backgroundColor: "rgba(0,69,124,0.75)",
    height: "100%"
  },
  sidebarContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%"
  },
  "@media (max-width: 1024px)": {
    sidebarContainer: {
      flexBasis: "200px",
      flexShrink: 1
    }
  },
  "@media (max-width:768px)": {
    sidebarContainer: {
      flexBasis: "auto",
      backgroundPosition: "15% 44%"
    },
    sidebarContent: {
      height: "auto",
      minHeight: 0
    }
  }
});

export function Sidebar({ sidebarRef, children }) {
  const classes = useStyles();

  return (
    <div className={classes.sidebarContainer} ref={sidebarRef}>
      <div className={classes.overlay}>
        <div className={classes.sidebarContent}>{children}</div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
  sidebarRef: PropTypes.object
};

export default Sidebar;
