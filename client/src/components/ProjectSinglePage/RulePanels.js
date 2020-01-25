import React from "react";
import { createUseStyles } from "react-jss";
import RuleList from "./RuleList";

const useStyles = createUseStyles({
  panel: {
    margin: "0.5em"
  },
  legend: {
    fontWeight: "bold"
  }
});

const RulePanels = props => {
  const classes = useStyles();
  const { rules } = props;
  const panelIds = rules.reduce((acc, rule) => {
    if (!acc.includes(rule.calculationPanelId)) {
      acc.push(rule.calculationPanelId);
    }
    return acc;
  }, []);
  // Group rules into an array where each element is an array of
  // rules for a particular panel
  const panelsRules = panelIds.map(panelId => {
    return rules.filter(rule => rule.calculationPanelId === panelId);
  });
  return (
    <React.Fragment>
      {panelsRules && panelsRules.length > 0
        ? panelsRules.map(rules => (
            <div
              key={rules[0].calculationPanelId}
              className={classes.panel}
            >
              <fieldset>
                <legend className={classes.legend}>
                  {rules[0].panelName}
                </legend>
                <RuleList
                  key={rules[0].calculationPanelId}
                  rules={rules}
                  onInputChange={props.onInputChange}
                />
              </fieldset>
            </div>
          ))
        : null}
    </React.Fragment>
  );
};

export default RulePanels;
