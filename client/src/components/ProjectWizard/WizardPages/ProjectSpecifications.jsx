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
    ...theme.typography.subHeading,
    marginTop: "0.5em",
    marginBottom: "1em"
  }
}));

function ProjectSpecifications(props) {
  const classes = useStyles();
  const { rules, onInputChange, uncheckAll, resetProject, page } = props;
  return (
    <div>
      <h1 className={classes.header}>Determine Project Level</h1>
      <h2 className={classes.subtitle}>
        Project Level (left panel) and Citywide Parking Baseline (next page) are
        determined by the use specifications entered below.
      </h2>
      <div className={classes.resetContainer}>
        <ResetButtons
          rightAlignStyle={{ marginRight: "0.3em" }}
          uncheckAll={uncheckAll}
          resetProject={resetProject}
        />
      </div>
      <RuleInputPanels
        rules={rules}
        onInputChange={onInputChange}
        page={page}
        showPlaceholder={true}
      />
    </div>
  );
}
ProjectSpecifications.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  page: PropTypes.number
};

export default ProjectSpecifications;
