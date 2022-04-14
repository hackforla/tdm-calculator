import React from "react";
import PropTypes from "prop-types";
import RuleInputList from "./RuleInputList";
import { getCalculationPanelIds, getPanelRules } from "../helpers";
import Panels from "../Common/Panels";

const RuleInputPanels = ({
  rules,
  suppressHeader,
  onInputChange,
  onAINInputError
}) => {
  const panelIds = getCalculationPanelIds(rules);
  const panelsRules = getPanelRules(panelIds, rules);

  return (
    <React.Fragment>
      {panelsRules.map((pRules, index) => (
        <Panels
          key={pRules[0].calculationPanelId}
          rules={pRules}
          suppressHeader={suppressHeader}
        >
          <RuleInputList
            key={pRules[0].calculationPanelId}
            rules={pRules}
            onInputChange={onInputChange}
            onAINInputError={onAINInputError}
            autoFocus={!index}
          />
        </Panels>
      ))}
    </React.Fragment>
  );
};

RuleInputPanels.propTypes = {
  rules: PropTypes.array.isRequired,
  suppressHeader: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  onAINInputError: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

export default RuleInputPanels;
