import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleInput from "./RuleInput";
import ProjectLevelRuleInput from "./ProjectLevelRuleInput";

const useStyles = createUseStyles({
  ruleInputList: {
    marginRight: "0.75em",
    marginLeft: "0.75em",
    minWidth: "60%"
  }
});

const RuleInputList = ({
  rules,
  partialMultiInput,
  onInputChange,
  onPartialMultiChange,
  onAINInputError,
  autoFocus,
  showPlaceholder,
  page
}) => {
  const classes = useStyles();

  return (
    <div className={classes.ruleInputList}>
      {rules && rules.length > 0
        ? rules.map((rule, index) => {
            return page === 1 ? (
              <RuleInput
                key={rule.id}
                rule={rule}
                partialMultiInput={partialMultiInput}
                onPropInputChange={onInputChange}
                onPartialMultiChange={onPartialMultiChange}
                onAINInputError={onAINInputError}
                autoFocus={autoFocus && !index}
                showPlaceholder={showPlaceholder}
              />
            ) : page === 2 ? (
              <ProjectLevelRuleInput
                key={rule.id}
                rule={rule}
                partialMultiInput={partialMultiInput}
                onPropInputChange={onInputChange}
                onPartialMultiChange={onPartialMultiChange}
                onAINInputError={onAINInputError}
                autoFocus={autoFocus && !index}
                showPlaceholder={showPlaceholder}
              />
            ) : null;
          })
        : null}
    </div>
  );
};
RuleInputList.propTypes = {
  rules: PropTypes.array,
  partialMultiInput: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onPartialMultiChange: PropTypes.func,
  onAINInputError: PropTypes.func,
  autoFocus: PropTypes.bool,
  showPlaceholder: PropTypes.bool,
  page: PropTypes.number
};

export default RuleInputList;
