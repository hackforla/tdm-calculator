import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";

function ProjectDescriptions(props) {
  const { rules, onInputChange } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">
        Welcome to Los Angeles&rsquo; TDM Calculator
      </h1>
      <h3 className="tdm-wizard-page-subtitle">
        First, let&rsquo;s name your project
      </h3>
      <form noValidate>
        <RuleInputPanels
          rules={rules}
          onInputChange={onInputChange}
          suppressHeader={true}
        />
      </form>
      <div className="tdm-wizard-page-disclaimer">
        <span className="tdm-wizard-page-disclaimer-asterisk">*</span>{" "}
        designates required fields
      </div>
    </div>
  );
}
ProjectDescriptions.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default ProjectDescriptions;
