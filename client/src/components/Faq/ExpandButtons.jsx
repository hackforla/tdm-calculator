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
  faqCarotIcon: {
    fontSize: "14px",
    margin: "-2px"
  },
  expandCollapseAll: {
    display: "flex",
    margin: "5px"
  },
  toggleButton: {
    marginRight: "1em",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

const ExpandButtons = ({ expanded, toggleExpandCollapse }) => {
  const classes = useStyles();

  return (
    <div className={classes.expandCollapseFlexContainer}>
      <div className={classes.expandCollapseAll}>
        <div className={classes.faqExpandIcons}>
          <FontAwesomeIcon
            icon={expanded ? faAngleUp : faAngleDown}
            className={classes.faqCarotIcon}
          />
        </div>
        <button className={classes.toggleButton} onClick={toggleExpandCollapse}>
          {expanded ? "Collapse All" : "Expand All"}
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
