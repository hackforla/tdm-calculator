import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import DiscoverTooltips from "./DiscoverTooltips";
import { createUseStyles, useTheme } from "react-jss";
import ResetButtons from "./ResetButtons";

const useStyles = createUseStyles(theme => ({
  disclaimer: {
    ...theme.typography.paragraph1,
    position: "relative",
    textAlign: "center",
    top: "20px"
  },
  asterisk: {
    color: theme.colorCritical
  }
}));

function ProjectDescriptions(props) {
  const {
    rules,
    partialAINInput,
    onInputChange,
    onPartialAINChange,
    onAINInputError,
    uncheckAll,
    resetProject,
    page
  } = props;
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
      <div style={{ marginBottom: "1em" }}>
        <ResetButtons
          rightAlignStyle={{ marginRight: "1.1em" }}
          uncheckAll={uncheckAll}
          resetProject={resetProject}
        />
      </div>
      <form noValidate>
        <RuleInputPanels
          rules={rules}
          partialMultiInput={partialAINInput}
          onInputChange={onInputChange}
          onPartialMultiChange={onPartialAINChange}
          onAINInputError={onAINInputError}
          suppressHeader={true}
          showPlaceholder={true}
          page={page}
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
  partialAINInput: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onPartialAINChange: PropTypes.func.isRequired,
  onAINInputError: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  page: PropTypes.number
};

export default ProjectDescriptions;
