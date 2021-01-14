import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "sidebar-container": {
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
    // opacity: "0.8",
    height: "100%"
  },
  "sidebar-content": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%"
  },
  "@media (max-width: 1024px)": {
    "sidebar-container": {
      flexBasis: "200px",
      flexShrink: 0
    }
  },
  "@media (max-width:768px)": {
    "sidebar-container": {
      flexBasis: "auto",
      backgroundPosition: "15% 44%"
    },
    "sidebar-content": {
      height: "auto",
      minHeight: 0
    }
  }
});

export function Sidebar(props) {
  const { sidebarRef } = props;
  const classes = useStyles();

  return (
    <div className={classes["sidebar-container"]} ref={sidebarRef}>
      <div className={classes.overlay}>
        <div className={classes["sidebar-content"]}>{props.children}</div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.any,
  sidebarRef: PropTypes.object
};

export default Sidebar;
