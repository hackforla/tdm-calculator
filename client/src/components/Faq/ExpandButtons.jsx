import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdUnfoldLess, MdUnfoldMore } from "react-icons/md";

const useStyles = createUseStyles({
  expandCollapseFlexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: "10px 0px"
  },
  faqExpandIcons: {
    display: "flex",
    flexDirection: "column"
  },
  faqCarotIcon: {
    fontSize: "large"
  },
  expandCollapseAll: {
    display: "flex"
  },
  toggleButton: {
    marginRight: "0",
    marginTop: "4px",
    marginBottom: "4px",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline",
    display: "flex"
  }
});

const ExpandButtons = ({ toggleExpandCollapse }) => {
  const classes = useStyles();

  return (
    <div className={classes.expandCollapseFlexContainer}>
      <div className={classes.expandCollapseAll}>
        <button
          className={classes.toggleButton}
          onClick={() => toggleExpandCollapse(true)}
        >
          <MdUnfoldMore className={classes.faqCarotIcon} />
          <span style={{ marginLeft: "0.2rem", marginBottom: ".1rem" }}>
            Expand All
          </span>
        </button>
        <button
          className={classes.toggleButton}
          onClick={() => toggleExpandCollapse()}
        >
          <MdUnfoldLess className={classes.faqCarotIcon} />
          <span style={{ marginLeft: "0.1rem" }}>Collapse All</span>
        </button>
      </div>
    </div>
  );
};

ExpandButtons.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleExpandCollapse: PropTypes.func.isRequired
};

export default ExpandButtons;
