import React from "react";
import { createUseStyles } from "react-jss";
import reactStringReplace from "react-string-replace";

const useStyles = createUseStyles({
  match: {
    border: "solid black 1px",
    borderRadius: "10px",
    padding: "2px 6px",
    boxSizing: "border-box",
    margin: "4px",
    display: "inline-block"
  }
});

const RuleFunction = props => {
  const classes = useStyles();
  const { functionBody, rules, setRuleId } = props;

  const findID = (match, category) =>
    rules.find(rule => rule.category === category && rule.code === match);

  let functionFormatted = reactStringReplace(
    functionBody,
    /<<([^>>]*)>>/g,
    (match, i) => {
      const calculationRule = findID(match, "calculation");
      let buttonColor = "lightYellow";

      if (calculationRule) {
        buttonColor = "lightGreen";
      }
      return (
        <span
          key={i}
          name={match}
          onClick={() => {
            calculationRule && setRuleId(calculationRule.id);
          }}
          className={classes.match}
          style={{ backgroundColor: buttonColor }}
        >
          {match}
        </span>
      );
    }
  );

  return (
    <React.Fragment>
      <pre>{functionFormatted}</pre>
    </React.Fragment>
  );
};

export default RuleFunction;
