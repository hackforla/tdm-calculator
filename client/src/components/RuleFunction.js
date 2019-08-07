import React from "react";
import reactStringReplace from "react-string-replace";

const RuleFunction = props => {
  const { functionBody, rules, setRuleId } = props;

  const findID = (match, category) => (
    rules.find( (rule) => rule.category === category && rule.code === match)
  )

  let functionFormatted = reactStringReplace(
    functionBody,
    /<<([^>>]*)>>/g,
    (match, i) => (
      <button key={i} name={match} onClick={()=> {
        const caclulationRule = findID(match, 'calculation')
        caclulationRule && setRuleId(caclulationRule.id)
      }
        }>
        {match}
      </button>
    )
  );

  //functionFormatted = <button onClick={setRuleId(12)}>TARGET_POINTS_PARK</button>

  console.log(functionFormatted);

  return <React.Fragment>{functionFormatted}</React.Fragment>;
};

export default RuleFunction;
