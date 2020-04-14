import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "sidebar-container": {
    margin: "0",
    flexBasis: "387px",
    flexGrow: 0,
    flexShrink: 1,
    backgroundImage: "url(/assets/hard-hats-silvia-brazzoduro.png)",
    backgroundPosition: "15% center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "sidebar-content": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "calc(100vh - 100px)"
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
    }
  }
});

export function Sidebar(props) {
  const classes = useStyles();

  return (
    <div className={classes["sidebar-container"]}>
      <div className={classes.overlay} />
      <div className={classes["sidebar-content"]}>{props.children}</div>
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.any
};

export default Sidebar;
