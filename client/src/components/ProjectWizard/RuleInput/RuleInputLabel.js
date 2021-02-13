import React from "react";
import ToolTipLabel from "../../ToolTip/ToolTipLabel";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  textInputLabelAnchor: {
    textDecoration: "underline"
  }
});

const RuleInputLabel = ({
  id,
  description,
  code,
  display,
  required,
  link,
  name
}) => {
  const classes = useStyles();

  return (
    <ToolTipLabel
      id={"tooltip-project-spec" + id}
      tooltipContent={description}
      htmlFor={code}
      disabledInput={!display}
      requiredInput={required}
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.textInputLabelAnchor}
        >
          {name}
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
  link: PropTypes.string
};
export default RuleInputLabel;
