import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import RuleInputPanels from "../RuleInput/RuleInputPanels";

function ProjectUse(props) {
  const { rules, onInputChange, classes, uncheckAll } = props;
  return (
    <div>
      <h1 className="tdm-wizard-page-title">
        What kind of development is your project?
      </h1>
      <h3 className="tdm-wizard-page-subtitle">Select all that apply</h3>
      <div className={classes.unSelectContainer}>
        <button
          className={classes.unSelectButton}
          onClick={uncheckAll}>
          Reset Page
        </button>
      </div>
       <RuleInputPanels
        rules={rules}
        onInputChange={onInputChange}
        suppressHeader={true}
      />
    </div>
  );
}

export default ProjectUse;
