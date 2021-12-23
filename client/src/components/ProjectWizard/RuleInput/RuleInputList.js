import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleInput from "./RuleInput";

const useStyles = createUseStyles({
  ruleInputList: {
    marginRight: "0.75em",
    marginLeft: "0.75em",
    minWidth: "60%"
  }
});

const RuleInputList = props => {
  const classes = useStyles();
  const { rules } = props;

  return (
    <div className={classes.ruleInputList}>
      {rules && rules.length > 0
        ? rules.map(rule => {
            return (
              <RuleInput
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
RuleInputList.propTypes = {
  rules: PropTypes.array,
  onInputChange: PropTypes.func.isRequired
};

export default RuleInputList;
