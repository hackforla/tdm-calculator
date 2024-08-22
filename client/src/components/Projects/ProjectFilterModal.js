import React from "react";
import { createUseStyles } from "react-jss";
// import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";

const useStyles = createUseStyles({
  modal: {
    color: "#012962"
  }
});

const ProjectTableHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.modal}>
      <div>Sort Options</div>
      <div>Search Options</div>
    </div>
  );
};

ProjectTableHeader.propTypes = {};

export default ProjectTableHeader;
