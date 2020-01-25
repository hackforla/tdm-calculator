import React from "react";

import WizardRuleStrategyList from "./WizardRuleStrategyList";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  panelContainer: {
      margin: "0.5em"
  },
  // below uses same styles as in WizardRuleStrategy.js
  strategyContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f2940",
    color: "white",
    padding: ".4em"
  },
  strategyName: {
    flexGrow: "1",
    flexShrink: "1",
  },
  points: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1" 
  }
});

const WizardRuleStrategyPanels = props => {
  const { rules, suppressHeader } = props;
  const panelIds = rules.reduce((acc, rule) => {
    if (!acc.includes(rule.calculationPanelId)) {
      acc.push(rule.calculationPanelId);
    }
    return acc;
  }, []);
  // Group rules into an array where each element is an array of
  // rules for a particular panel
  const classes = useStyles()

  const panelsRules = panelIds.map(panelId => {
    return rules.filter(rule => rule.calculationPanelId === panelId);
  });
  
  return (
    <React.Fragment>
      {panelsRules && panelsRules.length > 0
        ? <>
          {panelsRules.map(rules => (
              <div
                key={rules[0].calculationPanelId}
                className={classes.panelContainer}
              >

   {!suppressHeader 
                ? <div className={classes.strategyContainer}>
                    <h4 className={classes.strategyName}>{rules[0].panelName}</h4>
                    <div className={classes.points}>Possible</div>
                    <div className={classes.points}>Earned</div>
                  </div>
                : null}
               

                <WizardRuleStrategyList
                  key={rules[0].calculationPanelId}
                  rules={rules}
                  onInputChange={props.onInputChange}
                />
              </div>
            ))}
          </>

        : null}
    </React.Fragment>
  );
};

export default WizardRuleStrategyPanels;
