import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  resetContainer: {
    display: "grid",
    gridTemplateColumns: "[h-start] auto [h-end] 35%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  resetFlexContainer: {
    gridColumn: "h-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  unSelectButton: {
    margin: "0 1em",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  },
  resetProjectButton: {
    margin: "0 1em",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

function ProjectSpecifications(props) {
  const classes = useStyles();
  const { rules, onInputChange, uncheckAll, resetProject } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">Enter project specifications</h1>
      <h3 className="tdm-wizard-page-subtitle">
        Fill out the use specifications that apply to your project
      </h3>
      <div className={classes.resetContainer}>
        <div className={classes.resetFlexContainer}>
          <button className={classes.resetProjectButton} onClick={resetProject}>
            Reset Project
          </button>
          <button className={classes.unSelectButton} onClick={uncheckAll}>
            Reset Page
          </button>
        </div>
      </div>
      <RuleInputPanels rules={rules} onInputChange={onInputChange} />
    </div>
  );
}
ProjectSpecifications.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired
};

export default ProjectSpecifications;
