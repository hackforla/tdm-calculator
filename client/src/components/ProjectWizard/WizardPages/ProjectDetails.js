import React from 'react'
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import WizardRuleInputPanels from "../WizardRuleInputPanels";


function ProjectDetails(props) {
  const { rules, onInputChange, classes } = props;

  return (<div>
    <h1 className="tdm-wizard-page-title">
      Welcome to Los Angeles' TDM Calculator
    </h1>
    <h3 className="tdm-wizard-page-subtitle">
      First, let's name your project
    </h3>
    <WizardRuleInputPanels
      rules={rules}
      onInputChange={onInputChange}
      suppressHeader={true}
    />
  </div>)
}

export default ProjectDetails