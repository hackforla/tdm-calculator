import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import ResetButtons from "./ResetButtons";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles(theme => ({
  header: {
    ...theme.typography.heading1
  },
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
  },
  subtitle: {
    marginTop: "0.5em",
    marginBottom: "1em",
    textAlign: "center",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "140%"
  }
}));

function ProjectSpecifications(props) {
  const classes = useStyles();
  const { rules, onInputChange, uncheckAll, resetProject } = props;
  return (
    <div>
      <div className={classes.header}>Determine Project Level</div>
      <h3 className={classes.subtitle}>
        Project Level (left panel) and Citywide Parking Baseline (next page) are
        determined by the use specifications entered below.
      </h3>
      <div className={classes.resetContainer}>
        <ResetButtons
          rightAlignStyle={{ marginRight: "0.3em" }}
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
