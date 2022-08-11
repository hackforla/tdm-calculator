import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  tooltipLabel: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%"
  },
  accordionLabel: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%",
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "underline",
      cursor: "pointer"
    }
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  },
  requiredInputLabel: {
    "&:after": {
      content: '" *"',
      color: "red"
    }
  }
});

const ToolTipLabel = ({
  id,
  tooltipContent,
  children,
  code,
  requiredInput,
  disabledInput,
  setShowDescription,
  description
}) => {
  const classes = useStyles();
  const requiredStyle = requiredInput && classes.requiredInputLabel;
  const disabledStyle = disabledInput;

  const descriptionHandler = e => {
    e.preventDefault();
    setShowDescription(prev => !prev);
  };

  if (code && code.startsWith("UNITS_HABIT")) {
    return (
      <label
        onClick={descriptionHandler}
        htmlFor={code}
        className={
          description
            ? clsx(classes.accordionLabel, requiredStyle, disabledStyle)
            : clsx(classes.tooltipLabel, requiredStyle, disabledStyle)
        }
        data-class={classes.tooltip}
        data-for={id}
        data-tip={tooltipContent}
        data-iscapture="true"
        data-html="true"
      >
        {children}
      </label>
    );
  }

  return (
    <label
      onClick={descriptionHandler}
      htmlFor={code ? code : null}
      className={
        description
          ? clsx(classes.accordionLabel, requiredStyle, disabledStyle)
          : clsx(classes.tooltipLabel, requiredStyle, disabledStyle)
      }
      data-class={classes.tooltip}
      data-for={id}
      data-tip={tooltipContent}
      data-iscapture="true"
      data-html="true"
    >
      {children}
      {tooltipContent &&
        code &&
        !code.startsWith("STRATEGY") &&
        !code.startsWith("PKG") &&
        null}
    </label>
  );
};

ToolTipLabel.propTypes = {
  id: PropTypes.string.isRequired,
  tooltipContent: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  code: PropTypes.string,
  requiredInput: PropTypes.bool,
  disabledInput: PropTypes.bool,
  setShowDescription: PropTypes.func,
  description: PropTypes.string
};

export default ToolTipLabel;
