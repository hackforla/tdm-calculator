import React from "react";
import PropTypes from "prop-types";
import RuleStrategyList from "./RuleStrategyList";
import Loader from "react-loader";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  panelContainer: {
    margin: "0.5em"
  },
  // below uses same styles as in RuleStrategy.js
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
    margin: "0"
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

const RuleStrategyPanels = props => {
  const { rules, suppressHeader, projectLevel } = props;
  let panelIds = rules.reduce((acc, rule) => {
    if (!acc.includes(rule.calculationPanelId)) {
      acc.push(rule.calculationPanelId);
    }
    return acc;
  }, []);

  // Delete Package Bonus section if not project level != 1
  if (projectLevel !== 1) {
    panelIds = panelIds.filter(panelId => panelId !== 27);
  }
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
                  <div className={classes.points}>Possible</div>
                  <div className={classes.points}>Earned</div>
                </div>
              ) : null}
              <RuleStrategyList
                key={rules[0].calculationPanelId}
                rules={rules}
                onInputChange={props.onInputChange}
                onCommentChange={props.onCommentChange}
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
RuleStrategyPanels.propTypes = {
  projectLevel: PropTypes.number,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      calculationPanelId: PropTypes.number.isRequired,
      panelName: PropTypes.string.isRequired
    })
  ).isRequired,
  suppressHeader: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired
};

export default RuleStrategyPanels;
