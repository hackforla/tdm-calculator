import React from "react";
import ToolTipLabel from "../../ToolTip/ToolTipLabel";
import PropTypes from "prop-types";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RuleInputLabel = ({
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
      id={"tooltip-project-spec" + id}
      tooltipContent={description}
      code={code}
      disabledInput={!display}
      requiredInput={required}
      setShowDescription={setShowDescription}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" tabIndex="-1">
          {name}
          <FontAwesomeIcon icon={faLink} color="black" transform="shrink-5" />
        </a>
      ) : (
        name
      )}
    </ToolTipLabel>
  );
};

RuleInputLabel.propTypes = {
  id: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  display: PropTypes.bool,
  required: PropTypes.bool,
  link: PropTypes.string,
  setShowDescription: PropTypes.func
};
export default RuleInputLabel;
