import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import InputMask from "react-input-mask";

const useStyles = createUseStyles({
  field: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  numberFieldWrapper: {
    marginBottom: "0.4em",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#f0e300"
    }
  },
  numberFieldUnits: {
    flexBasis: "20%",
    marginLeft: "1em",
    flexGrow: "0",
    flexShrink: "1"
  },
  input: {
    padding: "0.1em",
    width: "5.5em",
    textAlign: "right"
  },
  unitsCaption: {
    flexBasis: "10%",
    marginLeft: "1em",
    flexGrow: "0",
    flexShrink: "1"
  },
  calcUnitsCaption: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  },
  checkboxFieldWrapper: {
    alignItems: "baseline",
    "&:hover": {
      backgroundColor: "#f0e300"
    }
  },
  checkboxFieldLabel: {
    flexBasis: "70%",
    flexGrow: "1",
    flexShrink: "1"
  },
  checkbox: {
    flexGrow: "0",
    flexShrink: "1",
    textAlign: "right"
  },
  selectFieldWrapper: {
    alignItems: "baseline",
    "&:hover": {
      backgroundColor: "#f0e300"
    }
  },
  selectFieldLabel: {
    flexBasis: "45%",
    flexGrow: "1",
    flexShrink: "1"
  },

  select: {
    flexBasis: "45%",
    flexGrow: "1",
    flexShrink: "1"
  },
  textFieldWrapper: {
    alignItems: "center"
  },
  miscFieldWrapper: {
    alignItems: "baseline",
    "&:hover": {
      backgroundColor: "#f0e300"
    }
  },
  miscFieldLabel: {
    flexBasis: "70%",
    flexGrow: "1",
    flexShrink: "1"
  },
  codeWrapper: {
    flexBasis: "10%",
    flexGrow: "0",
    flexShrink: "1"
  },
  textInput: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  textInputInvalid: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    border: "1px dashed red"
  },
  textInputLabel: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  textDisabledInputLabel: {
    opacity: "0.5"
  },
  textInputLabelAnchor: {
    textDecoration: "underline"
  },
  textarea: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    minHeight: "5em"
  },
  textareaInvalid: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    minHeight: "5em",
    border: "1px dashed red"
  },
  textareaLabel: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    minHeight: "5em"
  },
  requiredInputLabel: {
    "&:after": {
      content: '" *"',
      color: "red"
    }
  },
  errorLabel: {
    color: "red",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  }
});

const RuleInput = ({
  rule: {
    code,
    name,
    dataType,
    value,
    units,
    minValue,
    maxValue,
    choices,
    //calcValue,
    //calcUnits,
    display,
    required,
    minStringLength,
    maxStringLength,
    validationErrors,
    mask,
    link
  },
  onPropInputChange
}) => {
  const classes = useStyles();

  // The validationErrors property of the rule indicates whether the
  // violates any of the database-driven validation rules. For now, this
  // component is designed to hide the validation error message (but still
  // show the red outline around the input) if the input is invalid when
  // first rendered. The showValidationErrors flag will be set when the
  // user first touches the input field to display the text of the error message.
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const onInputChange = e => {
    setShowValidationErrors(true);
    onPropInputChange(e);
  };

  const onBlur = () => {
    setShowValidationErrors(true);
  };

  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div className={clsx(classes.field, classes.numberFieldWrapper)}>
          <label
            htmlFor={code}
            className={
              !display
                ? clsx(classes.textInputLabel, classes.textDisabledInputLabel)
                : required
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
          >
            {link ? (
              <a
                href={link}
                className={classes.textInputLabelAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </label>
          <div>
            <input
              className={classes.input}
              type="text"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              data-testid={code}
              min={minValue}
              max={maxValue}
              autoComplete="off"
              disabled={!display}
            />
          </div>
          <div
            className={
              !display
                ? clsx(classes.numberFieldUnits, classes.textDisabledInputLabel)
                : classes.numberFieldUnits
            }
          >
            {units}
          </div>
          {/* <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div> */}
        </div>
      ) : dataType === "boolean" ? (
        <div className={clsx(classes.field, classes.checkboxFieldWrapper)}>
          <label
            htmlFor={code}
            className={
              required
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
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
          </label>
          <input
            type="checkbox"
            className={classes.checkbox}
            value={true}
            checked={!!value}
            onChange={onInputChange}
            name={code}
            id={code}
            data-testid={code}
          />
          <div className={classes.numberFieldUnits}>{units}</div>
          {/* {calcValue ? (
            <>
              <div className={classes.unitsCaption}>{units}</div>
              <div className={classes.calcUnitsCaption}>
                {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
                  calcUnits || ""
                }`}
              </div>
            </>
          ) : null} */}
        </div>
      ) : dataType === "choice" ? (
        <div className={clsx(classes.field, classes.selectFieldWrapper)}>
          <label
            htmlFor={code}
            className={
              required
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
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
          </label>
          <select
            className={classes.select}
            value={value || ""}
            onChange={onInputChange}
            name={code}
            id={code}
            data-testid={code}
          >
            {choices.map(choice => (
              <option key={choice.id} value={choice.id}>
                {choice.name}
              </option>
            ))}
          </select>
          {/* <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div> */}
        </div>
      ) : dataType === "string" ||
        dataType === "textarea" ||
        dataType === "mask" ? (
        <div
          className={clsx(classes.field, classes.textFieldWrapper)}
          onBlur={onBlur}
        >
          <label
            htmlFor={code}
            className={
              required
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
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
          </label>
          {dataType === "string" ? (
            <input
              type="text"
              className={
                validationErrors ? classes.textInputInvalid : classes.textInput
              }
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              data-testid={code}
              maxLength={maxStringLength}
              autoComplete="off"
            />
          ) : dataType === "string" ? (
            <textarea
              className={
                validationErrors ? classes.textareaInvalid : classes.textarea
              }
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              data-testid={code}
              required={required}
              minLength={minStringLength}
              maxLength={maxStringLength}
              autoComplete="off"
            />
          ) : (
            <InputMask
              type="text"
              mask={mask}
              className={
                validationErrors ? classes.textInputInvalid : classes.textInput
              }
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              data-testid={code}
              maxLength={maxStringLength}
              autoComplete="off"
            />
          )}
        </div>
      ) : (
        <div className={clsx(classes.field, classes.miscFieldWrapper)}>
          <label
            htmlFor={code}
            className={
              required
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
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
          </label>
          <div className={classes.codeWrapper} name={code} id={code} />
          <div className={classes.unitsCaption}>{units}</div>
          {/* <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div> */}
        </div>
      )}
      {validationErrors && showValidationErrors ? (
        <div className={classes.field}>
          <div className={classes.textInputLabel}></div>
          <div className={clsx(classes.textInputLabel, classes.errorLabel)}>
            {validationErrors[0]}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

RuleInput.propTypes = {
  rule: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    value: PropTypes.any,
    units: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    choices: PropTypes.string,
    calcValue: PropTypes.any,
    calcUnits: PropTypes.string,
    display: PropTypes.bool,
    required: PropTypes.bool,
    minStringLength: PropTypes.number,
    maxStringLength: PropTypes.number,
    validationErrors: PropTypes.array,
    mask: PropTypes.string,
    link: PropTypes.string
  }),
  onPropInputChange: PropTypes.func
};

export default RuleInput;
