import React from "react";
import { createUseStyles } from "react-jss";
import RuleFunction from "./RuleFunction";

const useStyles = createUseStyles({
  rule: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "97%",
    margin: "0.5em",
    padding: "0.5em",
    backgroundColor: "lightGray",
    borderRadius: "0.5em"
  },
  ruleFunction: {
    width: "70%",
    minHeight: "5em",
    maxHeight: "none",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const RuleView = props => {
  const classes = useStyles();
  const { rule, rules, setRuleId } = props;
  return (
    <React.Fragment>
      <div className={classes.rule}>
        <h3>{rule.name}</h3>
        <h4>Rule Code: {rule.code}</h4>
        <div className={classes.ruleFunction}>
          <RuleFunction
            functionBody={rule.functionBody}
            rules={rules}
            setRuleId={setRuleId}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RuleView;
