import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleStrategy from "./RuleStrategy";

const useStyles = createUseStyles({
  root: {
    marginRight: ".75em",
    marginLeft: "0.75em",
    minWidth: "80%"
  }
});

const RuleStrategyList = props => {
  const classes = useStyles();
  const { rules } = props;
  return (
    <div className={classes.root}>
      {rules && rules.length > 0
        ? rules.map(rule => (
          <RuleStrategy
            key={rule.id}
            rule={rule}
            onInputChange={props.onInputChange}
          />
        ))
        : null}
    </div>
  );
};
RuleStrategyList.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default RuleStrategyList;
