import React from "react";
import reactStringReplace from "react-string-replace";
import { SSL_OP_SINGLE_DH_USE } from "constants";

const RuleFunction = props => {
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
          style={{
            backgroundColor: buttonColor,
            border: "solid black 1px",
            borderRadius: "8px",
            padding: "0px 4px"
          }}
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
