import React from "react";
import PropTypes from "prop-types";
import RuleInputPanels from "../RuleInput/RuleInputPanels";

function ProjectTargetPoints(props) {
  const { rules, onInputChange, classes } = props;
  return (
    <div className={classes.page4}>
      <h1 className="tdm-wizard-page-title">Calculate TDM Target Points</h1>
      <h3 className="tdm-wizard-page-subtitle">
        Enter the # of parking spaces you intend to build to complete the Target
        Point calculation
      </h3>
      <RuleInputPanels
        rules={rules}
        onInputChange={onInputChange}
        suppressHeader
      />
    </div>
  );
}
ProjectTargetPoints.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default ProjectTargetPoints;
