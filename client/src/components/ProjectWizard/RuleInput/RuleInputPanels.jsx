import React from "react";
import PropTypes from "prop-types";
import RuleInputList from "./RuleInputList";
import { getCalculationPanelIds, getPanelRules } from "../helpers";
import Panels from "../Common/Panels";

const RuleInputPanels = ({
  rules,
  partialMultiInput,
  suppressHeader,
  onInputChange,
  onPartialMultiChange,
  onAINInputError,
  showPlaceholder,
  page
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
            partialMultiInput={partialMultiInput}
            onInputChange={onInputChange}
            onPartialMultiChange={onPartialMultiChange}
            onAINInputError={onAINInputError}
            autoFocus={!index}
            showPlaceholder={showPlaceholder}
            page={page}
          />
        </Panels>
      ))}
    </React.Fragment>
  );
};

RuleInputPanels.propTypes = {
  rules: PropTypes.array.isRequired,
  partialMultiInput: PropTypes.string,
  suppressHeader: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  onPartialMultiChange: PropTypes.func,
  onAINInputError: PropTypes.func,
  autoFocus: PropTypes.bool,
  showPlaceholder: PropTypes.bool,
  page: PropTypes.number
};

export default RuleInputPanels;
