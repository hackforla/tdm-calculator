import React from "react";
import ToolTipLabel from "../../ToolTip/ToolTipLabel";
import PropTypes from "prop-types";
import { MdLink } from "react-icons/md";

/* 
Probably can be removed. Replaced by RuleLabel.jsx
*/

const RuleInputLabel = ({
  id,
  description,
  code,
  display,
  required,
  link,
  name,
  setShowDescription,
  showDescription
}) => {
  return (
    <ToolTipLabel
      id={"tooltip-project-spec" + id}
      tooltipContent={description}
      code={code}
      disabledInput={!display}
      requiredInput={required}
      setShowDescription={setShowDescription}
      description={description}
      showDescription={showDescription}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" tabIndex="-1">
          {name}
          <MdLink color="black" transform="shrink-5" />
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
  setShowDescription: PropTypes.func,
  showDescription: PropTypes.bool
};
export default RuleInputLabel;
