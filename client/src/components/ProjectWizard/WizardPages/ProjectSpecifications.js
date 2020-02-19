import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import RuleInputPanels from "../RuleInput/RuleInputPanels";

function ProjectSpecifications(props) {
  const { rules, onInputChange, classes, uncheckAll } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">
        Determine the required parking spaces
      </h1>
      <h3 className="tdm-wizard-page-subtitle">
        Enter the project specifications to determine the required parking
      </h3>
      <div className={classes.unSelectContainer}>
        <button
          className={classes.unSelectButton}
          onClick={uncheckAll}>
          Reset Page
        </button>
      </div>
       <RuleInputPanels rules={rules} onInputChange={onInputChange} />
    </div>
  );
}

export default ProjectSpecifications;
