import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";
import DiscoverTooltips from "./DiscoverTooltips";
import { useTheme } from "react-jss";

function ProjectDescriptions(props) {
  const { rules, onInputChange, onAINInputError } = props;
  const theme = useTheme();
  return (
    <div>
      <div style={theme.typography.heading1}>
        <span>
          Welcome to Los Angeles&rsquo; Transportation Demand Management (TDM)
          Calculator
        </span>
      </div>
      <div style={theme.typography.subHeading}>
        First, let&rsquo;s get some information about your project
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
      <div className="tdm-wizard-page-disclaimer">
        <DiscoverTooltips />
        <span className="tdm-wizard-page-disclaimer-asterisk">*</span>{" "}
        designates required fields
      </div>
    </div>
  );
}
ProjectDescriptions.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAINInputError: PropTypes.func.isRequired
};

export default ProjectDescriptions;
