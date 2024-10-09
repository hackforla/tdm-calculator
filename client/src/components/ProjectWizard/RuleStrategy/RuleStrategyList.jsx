import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleStrategy from "./RuleStrategy";

const useStyles = createUseStyles({
  ruleStrategyList: {
    marginRight: ".75em",
    marginLeft: "0.75em",
    minWidth: "80%"
  }
});

const RuleStrategyList = ({
  projectLevel,
  rules,
  onInputChange,
  onCommentChange,
  autoFocus
}) => {
  const classes = useStyles();
  return (
    <div className={classes.ruleStrategyList}>
      {rules && rules.length > 0
        ? rules.map((rule, index) => {
            return (
              <RuleStrategy
                key={rule.id}
                projectLevel={projectLevel}
                rule={rule}
                onPropInputChange={onInputChange}
                onCommentChange={onCommentChange}
                autoFocus={autoFocus && !index}
              />
            );
          })
        : null}
    </div>
  );
};

RuleStrategyList.propTypes = {
  projectLevel: PropTypes.number,
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

export default RuleStrategyList;
