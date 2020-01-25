import React from "react";
import { createUseStyles } from "react-jss";
import WizardRuleStrategy from "./WizardRuleStrategy";

const useStyles = createUseStyles({
  root: {
    marginRight: ".75em",
    marginLeft: "0.75em",
    minWidth: "80%"
  }
});

const WizardRuleStrategyList = props => {
  const classes = useStyles();
  const { rules } = props;
  return (
    <div className={classes.root}>
      {rules && rules.length > 0
        ? rules.map(rule => (
            <WizardRuleStrategy
              key={rule.id}
              rule={rule}
              onInputChange={props.onInputChange}
            />
          ))
        : null}
    </div>
  );
};

export default WizardRuleStrategyList;
