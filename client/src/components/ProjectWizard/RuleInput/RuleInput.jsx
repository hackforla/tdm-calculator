import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import AccordionToolTip from "../../ToolTip/AccordionToolTip";
import MultiMaskedInput from "../../UI/MultiMaskedInput";
import RuleLabel from "../Common/RuleLabel";

const useStyles = createUseStyles(theme => ({
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
    marginTop: "0.4em",
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
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  textInputInvalid: {
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    border: theme.border.dashedWarning
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
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    minHeight: "5em"
  },
  textareaInvalid: {
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    minHeight: "5em",
    border: theme.border.dashedWarning
  },
  errorLabel: {
    color: theme.colorCritical,
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  }
}));

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
    // mask,
    link
  },
  partialMultiInput,
  onPropInputChange,
  onPartialMultiChange,
  onAINInputError,
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
  const [inputError, setInputError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localDescription, setLocalDescription] = useState(description);

  // Add callback to handle description updates
  const handleDescriptionUpdate = newDescription => {
    setLocalDescription(newDescription);
    setIsEditing(false); // Close editing mode
  };

  const onInputChange = e => {
    setShowValidationErrors(true);
    onPropInputChange(e);
  };

  const onBlur = () => {
    setShowValidationErrors(true);
  };

  const onInputError = error => {
    setInputError(error);
    // propagate up to where the rule errors are used
    onAINInputError(error);
  };
  return (
    <React.Fragment>
      {display ? (
        dataType === "number" ? (
          <div
            className={clsx(classes.rowContainer, classes.numberFieldWrapper)}
            onBlur={onBlur}
          >
            <RuleLabel
              id={id}
              description={localDescription}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
              showDescription={showDescription}
              setIsEditing={setIsEditing}
            />

            <div>
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
          <div className={clsx(classes.rowContainer)}>
            <RuleLabel
              id={id}
              description={localDescription}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
              setIsEditing={setIsEditing}
            />
            <input
              type="checkbox"
              autoFocus={autoFocus}
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
            onBlur={onBlur}
          >
            <RuleLabel
              id={id}
              description={localDescription}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
              setIsEditing={setIsEditing}
            />
            <select
              autoFocus={autoFocus}
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
            <RuleLabel
              id={id}
              description={localDescription}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
              showDescription={showDescription}
              setIsEditing={setIsEditing}
            />

            {dataType === "string" ? (
              <input
                type="text"
                autoFocus={autoFocus}
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
                placeholder={
                  showPlaceholder ? (required ? "required" : "optional") : ""
                }
              />
            ) : dataType === "textarea" ? (
              <textarea
                autoFocus={autoFocus}
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
                placeholder={
                  showPlaceholder ? (required ? "required" : "optional") : ""
                }
              />
            ) : (
              <MultiMaskedInput
                className={classes.textInput}
                code={code}
                value={value}
                validationErrors={validationErrors}
                mask={"9999-999-999"}
                onChange={onInputChange}
                onError={onInputError}
                setShowValidationErrors={setShowValidationErrors}
                required={required}
                partialValue={partialMultiInput}
                onPartialValueChange={onPartialMultiChange}
              />
            )}
          </div>
        ) : (
          <div className={clsx(classes.rowContainer, classes.miscFieldWrapper)}>
            <RuleLabel
              id={id}
              description={localDescription}
              code={code}
              display={display}
              required={required}
              link={link}
              name={name}
              setShowDescription={setShowDescription}
              setIsEditing={setIsEditing}
            />
            <div className={classes.codeWrapper} name={code} id={code} />
            <div className={classes.unitsCaption}>{units}</div>
          </div>
        )
      ) : null}
      {display && inputError && showValidationErrors ? (
        <div className={classes.rowContainer}>
          <div className={classes.textInputLabel}></div>
          <div className={clsx(classes.textInputLabel, classes.errorLabel)}>
            {inputError}
          </div>
        </div>
      ) : display && validationErrors && showValidationErrors ? (
        <div className={classes.rowContainer}>
          <div className={classes.textInputLabel}></div>
          <div className={clsx(classes.textInputLabel, classes.errorLabel)}>
            {validationErrors[0]}
          </div>
        </div>
      ) : null}
      {(showDescription && localDescription) || isEditing ? (
        <AccordionToolTip
          description={localDescription || ""}
          setShowDescription={setShowDescription}
          id={id}
          forceEditMode={isEditing}
          onEditDescription={handleDescriptionUpdate}
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
  partialMultiInput: PropTypes.string,
  onPropInputChange: PropTypes.func,
  onPartialMultiChange: PropTypes.func,
  onAINInputError: PropTypes.func,
  autoFocus: PropTypes.bool,
  showPlaceholder: PropTypes.bool
};

export default RuleInput;
