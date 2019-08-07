import React from "react";
import reactStringReplace from "react-string-replace";

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
        <button
          key={i}
          name={match}
          onClick={() => {
            calculationRule && setRuleId(calculationRule.id);
          }}
          style={{
            backgroundColor: buttonColor
          }}
        >
          {match}
        </button>
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
