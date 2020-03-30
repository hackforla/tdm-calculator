import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";

function ProjectSpecifications(props) {
  const { rules, onInputChange, classes, uncheckAll } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">Enter project specifications</h1>
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
  classes: PropTypes.object.isRequired,
  uncheckAll: PropTypes.func.isRequired
};

export default ProjectSpecifications;
