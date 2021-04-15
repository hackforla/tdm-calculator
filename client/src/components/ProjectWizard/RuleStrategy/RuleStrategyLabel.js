import React from "react";
import ToolTipLabel from "../../ToolTip/ToolTipLabel";
import PropTypes from "prop-types";

const RuleStrategyLabel = ({
  id,
  description,
  code,
  display,
  required,
  link,
  name
}) => {
  return (
    <ToolTipLabel
      id={"tooltip-strategy" + id}
      tooltipContent={description}
      htmlFor={code}
      disabledInput={!display}
      requiredInput={required}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        name
      )}
    </ToolTipLabel>
  );
};

RuleStrategyLabel.propTypes = {
  id: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  display: PropTypes.bool,
  required: PropTypes.bool,
  link: PropTypes.string
};
export default RuleStrategyLabel;
