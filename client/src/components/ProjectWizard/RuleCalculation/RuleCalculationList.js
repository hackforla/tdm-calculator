import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleCalculation from "./RuleCalculation";

const useStyles = createUseStyles({
  root: {
    marginRight: "0.75em",
    marginLeft: "0.75em",
    minWidth: "60%"
  }
});

const RuleCalculationList = props => {
  const classes = useStyles();
  const { rules } = props;
  return (
    <div className={classes.root}>
      {rules && rules.length > 0
        ? rules.map(rule => {
            if (
              rule.id === 38 ||
              rule.id === 39 ||
              rule.id === 16 ||
              rule.id === 237
            ) {
              return "";
            }
            return (
              <RuleCalculation
                key={rule.id}
                rule={rule}
                onPropInputChange={props.onInputChange}
              />
            );
          })
        : null}
    </div>
  );
};
RuleCalculationList.propTypes = {
  rules: PropTypes.array,
  onInputChange: PropTypes.func.isRequired
};

export default RuleCalculationList;
