import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const useStyles = createUseStyles({
  sidebarLayoutContainer: {
    display: "flex",
    flexDirection: "row"
  }
});

const PlainSidebarLayout = ({ ref }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarLayoutContainer} ref={ref}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

PlainSidebarLayout.propTypes = {
  ref: PropTypes.any
};

export default PlainSidebarLayout;
