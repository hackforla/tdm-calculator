import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import DiscoverTooltips from "./DiscoverTooltips";
import { createUseStyles, useTheme } from "react-jss";
import ResetButtons from "./ResetButtons";

const useStyles = createUseStyles({
  disclaimer: {
    fontStyle: "normal",
    fontWeight: "400",
    position: "relative",
    textAlign: "center",
    top: "20px"
  },
  asterisk: {
    color: "red"
  }
});

function ProjectDescriptions(props) {
  const { rules, onInputChange, onAINInputError, uncheckAll, resetProject } =
    props;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <div style={theme.typography.heading1}>
        <span>
          Welcome to Los Angeles&rsquo; Transportation Demand Management (TDM)
          Calculator
        </span>
      </div>
      <h3 style={theme.typography.subHeading}>
        First, let&rsquo;s get some information about your project
      </h3>
      <div
        className={classes.pkgSelectContainer}
        style={{ marginBottom: "1em" }}
      >
        <ResetButtons
          className={classes.alignRight}
          uncheckAll={uncheckAll}
          resetProject={resetProject}
        />
      </div>
      <form noValidate>
        <RuleInputPanels
          rules={rules}
          onInputChange={onInputChange}
          onAINInputError={onAINInputError}
          suppressHeader={true}
          showPlaceholder={true}
        />
      </form>
      <div className={classes.disclaimer}>
        <DiscoverTooltips />
        <span className={classes.asterisk}>*</span> designates required fields
      </div>
    </div>
  );
}
ProjectDescriptions.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAINInputError: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired
};

export default ProjectDescriptions;
