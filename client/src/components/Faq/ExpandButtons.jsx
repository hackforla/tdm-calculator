import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  expandCollapseFlexContainer: {
    gridColumn: "h-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  faqExpandIcons: {
    display: "flex",
    flexDirection: "column"
  },
  expandAllButton: {
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  },
  collapseAllButton: {
    marginRight: "1em",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  },
  faqCarotIcon: {
    fontSize: "14px"
  }
});

const ExpandButtons = props => {
  const classes = useStyles();
  const { uncheckAll, resetProject } = props;
  return (
    <div className={classes.expandCollapseFlexContainer}>
      <div className={classes.faqExpandIcons}>
        <FontAwesomeIcon icon={faAngleUp} className={classes.faqCarotIcon} />
        <FontAwesomeIcon icon={faAngleDown} className={classes.faqCarotIcon} />
      </div>
      <button
        className={classes.expandAllButton}
        // data-testid="resetProject"
        onClick={resetProject}
      >
        Expand All
      </button>
      <div className={classes.faqExpandIcons}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.faqCarotIcon} />
        <FontAwesomeIcon icon={faAngleUp} className={classes.faqCarotIcon} />
      </div>
      <button className={classes.collapseAllButton} onClick={uncheckAll}>
        Collapse All
      </button>
    </div>
  );
};

ExpandButtons.propTypes = {
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired
};

export default ExpandButtons;
