import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  unSelectContainer: {
    display: "grid",
    gridTemplateColumns: "[h-start] 20% [h-mid] auto [h-end] 20%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  unSelectButton: {
    marginLeft: "auto",
    marginRight: "1em",
    gridColumn: "h-end",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

function ProjectSpecifications(props) {
  const classes = useStyles();
  const { rules, onInputChange, uncheckAll } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">Enter project specifications</h1>
      <h3 className="tdm-wizard-page-subtitle">
        Fill out the use specifications that apply to your project
      </h3>
      <div className={classes.unSelectContainer}>
        <button className={classes.unSelectButton} onClick={uncheckAll}>
          Reset Page
        </button>
      </div>
      <RuleInputPanels rules={rules} onInputChange={onInputChange} />
    </div>
  );
}
ProjectSpecifications.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired
};

export default ProjectSpecifications;
