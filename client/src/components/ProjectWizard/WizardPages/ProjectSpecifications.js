import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import ResetButtons from "./ResetButtons";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  resetContainer: {
    display: "grid",
    gridTemplateColumns: "[h-start] auto [h-end] 35%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  alignRight: {
    gridColumn: "h-end",
    justifyContent: "flex-end"
  }
});

function ProjectSpecifications(props) {
  const classes = useStyles();
  const { rules, onInputChange, uncheckAll, resetProject } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">Determine Project Level</h1>
      <h3 className="tdm-wizard-page-subtitle">
        Project Level (left panel) and Citywide Parking Baseline (next page) are
        determined by the use sepcifications entered below.
      </h3>
      <div className={classes.resetContainer}>
        <ResetButtons
          className={classes.alignRight}
          uncheckAll={uncheckAll}
          resetProject={resetProject}
        />
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
