import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdOutlineUnfoldMore, MdOutlineUnfoldLess } from "react-icons/md";

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
    fontSize: "large",
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

const ExpandButtons = ({ toggleExpandCollapse }) => {
  const classes = useStyles();

  return (
    <div className={classes.expandCollapseFlexContainer}>
      <div className={classes.expandCollapseAll}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <MdOutlineUnfoldMore className={classes.faqCarotIcon} />
          <button
            className={classes.toggleButton}
            onClick={() => toggleExpandCollapse(true)}
          >
            Expand All
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <MdOutlineUnfoldLess className={classes.faqCarotIcon} />
          <button
            className={classes.toggleButton}
            onClick={() => toggleExpandCollapse()}
          >
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
};

ExpandButtons.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleExpandCollapse: PropTypes.func.isRequired
};

export default ExpandButtons;
