import React from "react";
import { createUseStyles } from "react-jss";
import WizardRuleInput from "./WizardRuleInput";

const useStyles = createUseStyles({
  root: {
    marginRight: "0.75em",
    marginLeft: "0.75em",
    minWidth: "60%"
  }
});

const WizardRuleInputList = props => {
  const classes = useStyles();
  const { rules } = props;
  return (
    <div className={classes.root}>
      {rules && rules.length > 0
        ? rules.map(rule => {
            if (rule.id === 38 || rule.id === 39) {
              return "";
            }
            return (
              <WizardRuleInput
                key={rule.id}
                rule={rule}
                onInputChange={props.onInputChange}
              />
            );
          })
        : null}
    </div>
  );
};

export default WizardRuleInputList;
