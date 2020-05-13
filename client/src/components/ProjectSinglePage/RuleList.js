import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleInput from "./RuleInput";

const useStyles = createUseStyles({
  root: {
    marginRight: ".75em",
    marginLeft: "0.75em",
    minWidth: "80%"
  }
});

const RuleList = props => {
  const classes = useStyles();
  const { rules } = props;
  return (
    <div className={classes.root}>
      {rules && rules.length > 0
        ? rules.map(rule => {
            if (rule.id === 38 || rule.id === 39) return "";
            return (
              <RuleInput
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
RuleList.propTypes = {
  rules: PropTypes.array,
  onInputChange: PropTypes.func.isRequired
};

export default RuleList;
