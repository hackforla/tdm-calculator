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
  name,
  setShowDescription
}) => {
  return (
    <ToolTipLabel
      id={"tooltip-strategy" + id}
      tooltipContent={description}
      code={code}
      disabledInput={!display}
      requiredInput={required}
      setShowDescription={setShowDescription}
      description={description}
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
  description: PropTypes.any,
  display: PropTypes.bool,
  required: PropTypes.bool,
  link: PropTypes.string,
  setShowDescription: PropTypes.func
};
export default RuleStrategyLabel;
