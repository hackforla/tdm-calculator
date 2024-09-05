import React, { useState } from "react";
import PropTypes from "prop-types";
import RuleView from "./RuleView";
import UniversalSelect from "../UI/UniversalSelect";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  select: {
    width: "275px"
  }
});

const RuleViewContainer = props => {
  const { rules } = props;
  const [ruleId, setRuleId] = useState(rules[0].id);
  const rule = rules.filter(rule => rule.id === ruleId)[0];
  const classes = useStyles();

  const handleSetRule = e => {
    const ruleId = Number(e.target.value);
    setRuleId(ruleId);
  };

  return (
    <React.Fragment>
      <UniversalSelect
        className={classes.select}
        options={rules.map(rule => ({
          value: rule.id.toString(),
          label: rule.code
        }))}
        value={ruleId}
        onChange={handleSetRule}
        name={"Rule"}
      />

      <RuleView rule={rule} rules={rules} setRuleId={setRuleId} />
    </React.Fragment>
  );
};
RuleViewContainer.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      // filter: PropTypes.string.isRequired,
      // length: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired
    })
  )
};

export default RuleViewContainer;
