import React from "react";
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

export default ProjectTargetPoints;
