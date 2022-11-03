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
    justifyContent: "flex-end",
    margin: "20px 0px"
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
    fontSize: "14px",
    margin: "-2px"
  },
  expandCollapseAll: {
    display: "flex",
    margin: "5px"
  }
});

const ExpandButtons = props => {
  const classes = useStyles();
  const { expandAll, collapseAll } = props;

  return (
    <div className={classes.expandCollapseFlexContainer}>
      <div className={classes.expandCollapseAll}>
        <div className={classes.faqExpandIcons}>
          <FontAwesomeIcon icon={faAngleUp} className={classes.faqCarotIcon} />
          <FontAwesomeIcon
            icon={faAngleDown}
            className={classes.faqCarotIcon}
          />
        </div>
        <button
          className={classes.expandAllButton}
          // data-testid="resetProject"
          onClick={expandAll}
        >
          Expand All
        </button>
      </div>
      <div className={classes.expandCollapseAll}>
        <div className={classes.faqExpandIcons}>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={classes.faqCarotIcon}
          />
          <FontAwesomeIcon icon={faAngleUp} className={classes.faqCarotIcon} />
        </div>
        <button className={classes.collapseAllButton} onClick={collapseAll}>
          Collapse All
        </button>
      </div>
    </div>
  );
};

ExpandButtons.propTypes = {
  expandAll: PropTypes.func.isRequired,
  collapseAll: PropTypes.func.isRequired
};

export default ExpandButtons;
