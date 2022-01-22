import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import InputMask from "react-input-mask";
import AccordionToolTip from "../../ToolTip/AccordionToolTip";
import RuleInputLabel from "./RuleInputLabel";

const useStyles = createUseStyles({
  rowContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  numberFieldWrapper: {
    marginBottom: "0.4em",
    alignItems: "center",
    "&:hover": {
      backgroundColor: ({ theme }) => theme.colorHighlight
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
  inputInvalid: {
    padding: "0.1em",
    width: "5.5em",
    textAlign: "right",
    border: "1px dashed red"
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
      backgroundColor: ({ theme }) => theme.colorHighlight
    }
  },
  checkbox: {
    flexGrow: "0",
    flexShrink: "1",
    textAlign: "right"
  },
  selectFieldWrapper: {
    alignItems: "baseline",
    "&:hover": {
      backgroundColor: ({ theme }) => theme.colorHighlight
    }
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
      backgroundColor: ({ theme }) => theme.colorHighlight
    }
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
  errorLabel: {
    color: "red",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  }
});

const RuleInput = ({
  rule: {
    id,
    code,
    name,
    dataType,
    value,
    units,
    maxValue,
    choices,
    description,
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

  const onBlur = () => {
    setShowValidationErrors(true);
  };

  return (
    <React.Fragment>
      {display ? (
        dataType === "number" ? (
          <div
            className={clsx(classes.rowContainer, classes.numberFieldWrapper)}
          >
            <RuleInputLabel
              id={id}
              description={description}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
            />
            <div>
              <input
                className={
                  validationErrors ? classes.inputInvalid : classes.input
                }
                type="text"
                value={value || ""}
                onChange={onInputChange}
                name={code}
                id={code}
                data-testid={code}
                max={maxValue}
                autoComplete="off"
                disabled={!display}
              />
            </div>
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
        ) : dataType === "boolean" ? (
          <div
            className={clsx(classes.rowContainer, classes.checkboxFieldWrapper)}
          >
            <RuleInputLabel
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
        ) : dataType === "choice" ? (
          <div
            className={clsx(classes.rowContainer, classes.selectFieldWrapper)}
          >
            <RuleInputLabel
              id={id}
              description={description}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
            />
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
          </div>
        ) : dataType === "string" ||
          dataType === "textarea" ||
          dataType === "mask" ? (
          <div
            className={clsx(classes.rowContainer, classes.textFieldWrapper)}
            onBlur={onBlur}
          >
            <RuleInputLabel
              id={id}
              description={description}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
            />
            {dataType === "string" ? (
              <input
                type="text"
                className={
                  validationErrors
                    ? classes.textInputInvalid
                    : classes.textInput
                }
                value={value || ""}
                onChange={onInputChange}
                name={code}
                id={code}
                data-testid={code}
                maxLength={maxStringLength}
                autoComplete="off"
              />
            ) : dataType === "textarea" ? (
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
                  validationErrors
                    ? classes.textInputInvalid
                    : classes.textInput
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
          <div className={clsx(classes.rowContainer, classes.miscFieldWrapper)}>
            <RuleInputLabel
              id={id}
              description={description}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
            />
            <div className={classes.codeWrapper} name={code} id={code} />
            <div className={classes.unitsCaption}>{units}</div>
          </div>
        )
      ) : null}
      {display && validationErrors && showValidationErrors ? (
        <div className={classes.rowContainer}>
          <div className={classes.textInputLabel}></div>
          <div className={clsx(classes.textInputLabel, classes.errorLabel)}>
            {validationErrors[0]}
          </div>
        </div>
      ) : null}
      {showDescription && description ? (
        <AccordionToolTip
          description={description}
          setShowDescription={setShowDescription}
        />
      ) : null}
    </React.Fragment>
  );
};

RuleInput.propTypes = {
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
  onPropInputChange: PropTypes.func
};

export default RuleInput;
