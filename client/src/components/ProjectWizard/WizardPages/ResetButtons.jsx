import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  resetFlexContainer: {
    gridColumn: "h-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  unSelectButton: {
    marginRight: "1em",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "normal"
  },
  resetProjectButton: {
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "normal"
  }
});

const ResetButtons = props => {
  const classes = useStyles();
  const { uncheckAll, resetProject, rightAlignStyle } = props;
  return (
    <div className={classes.resetFlexContainer}>
      <button
        className={classes.resetProjectButton}
        data-testid="resetProject"
        onClick={resetProject}
      >
        Reset Project
      </button>
      {uncheckAll && (
        <button
          className={classes.unSelectButton}
          style={rightAlignStyle}
          onClick={uncheckAll}
        >
          Clear Page
        </button>
      )}
    </div>
  );
};

ResetButtons.propTypes = {
  uncheckAll: PropTypes.func,
  resetProject: PropTypes.func.isRequired,
  rightAlignStyle: PropTypes.object
};

export default ResetButtons;
