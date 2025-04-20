import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import RuleLabel from "../Common/RuleLabel";

const useStyles = createUseStyles(theme => ({
  rowContainer: {
    display: "flex",
    margin: "0.4em 0.2em 0.4em 0.2em",
    minWidth: "60vw",
    alignItems: "center"
  },
  numberFieldUnits: {
    flexBasis: "20%",
    marginLeft: "1em",
    flexGrow: "0",
    flexShrink: "1"
  },
  input: {
    boxSizing: "border-box",
    padding: "0.1em",
    width: "5.5em",
    textAlign: "right"
  },
  inputInvalid: {
    boxSizing: "border-box",
    padding: "0.1em",
    width: "5.5em",
    textAlign: "right",
    border: theme.border.dashedWarning
  },
  checkbox: {
    flexGrow: "0",
    flexShrink: "1",
    textAlign: "right"
  },
  errorLabel: {
    color: theme.colorCritical,
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  rowItem1: {
    flex: "0 0 72.5%"
  },
  rowItem2: {
    flex: "1 1 0%"
  },
  rowItem3: {
    flex: "1 1 20%"
  }
}));

const ProjectLevelRuleInput = ({
  rule: {
    id,
    code,
    name,
    dataType,
    value,
    units,
    maxValue,
    description,
    display,
    required,
    validationErrors,
    link
  },
  onPropInputChange,
  autoFocus,
  showPlaceholder
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  // The validationErrors property of the rule indicates whether the
  // violates any of the database-driven validation rules. For now, this
  // component is designed to hide the validation error message (but still
  // show the red outline around the input) if the input is invalid when
  // first rendered. The showValidationErrors flag will be set when the
  // user first touches the input field to display the text of the error message.
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const onInputChange = e => {
    setShowValidationErrors(true);
    onPropInputChange(e);
  };

  return (
    <React.Fragment>
      {display ? (
        dataType === "number" ? (
          <div className={classes.rowContainer}>
            <div className={classes.rowItem1}>
              <RuleLabel
                id={id}
                description={description}
                code={code}
                display={display}
                required={required}
                link={link}
                name={name}
                setShowDescription={setShowDescription}
                showDescription={showDescription}
              />
            </div>
            <div className={classes.rowItem2}>
              <input
                className={
                  validationErrors ? classes.inputInvalid : classes.input
                }
                type="text"
                autoFocus={autoFocus}
                value={value || ""}
                onChange={onInputChange}
                name={code}
                id={code}
                data-testid={code}
                max={maxValue}
                autoComplete="off"
                disabled={!display}
                placeholder={
                  showPlaceholder ? (required ? "required" : "optional") : ""
                }
              />
            </div>
            <div className={classes.rowItem3}>
              <div
                className={
                  !display
                    ? clsx(
                        classes.numberFieldUnits,
                        classes.textDisabledInputLabel
                      )
                    : classes.numberFieldUnits
                }
              >
                {units}
              </div>
            </div>
          </div>
        ) : dataType === "boolean" ? (
          <div className={clsx(classes.rowContainer)}>
            <RuleLabel
              id={id}
              description={description}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
            />
            <input
              type="checkbox"
              autoFocus={autoFocus}
              className={classes.checkbox}
              value={true}
              checked={!!value}
              onChange={onInputChange}
              name={code}
              id={code}
              data-testid={code}
            />
            <div className={classes.numberFieldUnits}>{units}</div>
          </div>
        ) : null
      ) : null}
      {display && validationErrors && showValidationErrors ? (
        <div className={classes.rowContainer}>
          <div className={classes.rowItem1}></div>
          <div className={clsx(classes.rowItem2, classes.errorLabel)}>
            {validationErrors[0]}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

ProjectLevelRuleInput.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    value: PropTypes.any,
    units: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    choices: PropTypes.string,
    description: PropTypes.string,
    calcValue: PropTypes.number,
    calcUnits: PropTypes.string,
    display: PropTypes.bool,
    required: PropTypes.bool,
    minStringLength: PropTypes.number,
    maxStringLength: PropTypes.number,
    validationErrors: PropTypes.array,
    mask: PropTypes.string,
    link: PropTypes.string
  }),
  partialMultiInput: PropTypes.string,
  onPropInputChange: PropTypes.func,
  onPartialMultiChange: PropTypes.func,
  onAINInputError: PropTypes.func,
  autoFocus: PropTypes.bool,
  showPlaceholder: PropTypes.bool
};

export default ProjectLevelRuleInput;
