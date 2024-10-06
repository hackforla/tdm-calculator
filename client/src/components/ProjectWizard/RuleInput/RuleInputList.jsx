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

const RuleInputList = ({
  rules,
  onInputChange,
  onAINInputError,
  autoFocus,
  showPlaceholder
}) => {
  const classes = useStyles();

  return (
    <div className={classes.ruleInputList}>
      {rules && rules.length > 0
        ? rules.map((rule, index) => {
            return (
              <RuleInput
                key={rule.id}
                rule={rule}
                onPropInputChange={onInputChange}
                onAINInputError={onAINInputError}
                autoFocus={autoFocus && !index}
                showPlaceholder={showPlaceholder}
              />
            );
          })
        : null}
    </div>
  );
};
RuleInputList.propTypes = {
  rules: PropTypes.array,
  onInputChange: PropTypes.func.isRequired,
  onAINInputError: PropTypes.func,
  autoFocus: PropTypes.bool,
  showPlaceholder: PropTypes.bool
};

export default RuleInputList;
