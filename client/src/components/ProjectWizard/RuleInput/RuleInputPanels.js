import React from "react";
import PropTypes from "prop-types";
import RuleInputList from "./RuleInputList";
import Loader from "react-loader";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  panelContainer: {
    margin: "0.5em"
  },
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
    flexShrink: "1"
  },
  points: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  },
  loaderContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center"
  }
});

const RuleInputPanels = props => {
  const { rules, suppressHeader } = props;
  const panelIds = rules.reduce((acc, rule) => {
    if (!acc.includes(rule.calculationPanelId)) {
      acc.push(rule.calculationPanelId);
    }
    return acc;
  }, []);

  // Group rules into an array where each element is an array of
  // rules for a particular panel
  const classes = useStyles();

  const panelsRules = panelIds.map(panelId => {
    return rules.filter(rule => rule.calculationPanelId === panelId);
  });

  return (
    <React.Fragment>
      {panelsRules && panelsRules.length > 0 ? (
        <>
          {panelsRules.map(rules => (
            <div
              key={rules[0].calculationPanelId}
              className={classes.panelContainer}
            >
              {!suppressHeader ? (
                <div className={classes.strategyContainer}>
                  <h4 className={classes.strategyName}>{rules[0].panelName}</h4>
                </div>
              ) : null}
              <RuleInputList
                key={rules[0].calculationPanelId}
                rules={rules}
                onInputChange={props.onInputChange}
              />
            </div>
          ))}
        </>
      ) : (
        <div className={classes.loaderContainer}>
          <Loader loaded={false} className="spinner" left="auto" />
        </div>
      )}
    </React.Fragment>
  );
};
RuleInputPanels.propTypes = {
  rules: PropTypes.array.isRequired,
  suppressHeader: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired
};

export default RuleInputPanels;
