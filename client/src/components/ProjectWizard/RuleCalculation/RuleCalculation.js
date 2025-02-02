import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
// import ToolTip from "../../ToolTip/ToolTip";
import clsx from "clsx";
import Popup from "reactjs-popup";
import { MdClose } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  field: {
    margin: "1em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  numberFieldWrapper: {
    marginBottom: "2em",
    marginTop: "2em",
    alignItems: "center"
  },
  numberField: {
    flexBasis: "20%",
    flexGrow: "1",
    flexShrink: "1",
    marginBottom: ".5em"
  },
  numberFieldUnits: {
    flexBasis: "20%",
    marginLeft: "1em",
    flexGrow: "0",
    flexShrink: "1",
    fontSize: 22,
    paddingTop: 22
  },
  input: {
    padding: "0.1em",
    textAlign: "right",
    marginTop: ".5em",
    height: 45
  },
  unitsCaption: {
    ...theme.typography.heading3,
    flexGrow: "0",
    flexShrink: "1"
  },
  calcUnits: {
    ...theme.typography.heading3
  },
  calcUnitsCaption: {
    ...theme.typography.heading3,
    flexBasis: "33%",
    marginRight: "0.5em",
    textAlign: "left",
    flexGrow: "0",
    flexShrink: "1"
  },
  calcNumber: {
    ...theme.typography.largeText
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
    flexBasis: "10%",
    flexGrow: "0",
    flexShrink: "1"
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
    alignItems: "baseline"
  },
  miscFieldLabel: {
    flexGrow: "1",
    flexShrink: "1",
    textAlign: "right"
  },
  codeWrapper: {
    flexBasis: "8%",
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
    border: theme.border.dashedWarning
  },
  fieldLabel: {
    ...theme.typography.heading2
  },
  textInputLabel: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    textAlign: "center",
    marginLeft: 100,
    fontSize: 22
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
    border: theme.border.dashedWarning
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
      color: theme.colors.warning
    }
  },
  errorLabel: {
    color: theme.colors.warning,
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  baselineIconContainer: {
    width: 16,
    height: 16,
    display: "inline-block"
  }
}));

// Page 3
const RuleCalculation = ({
  rule: {
    id,
    code,
    name,
    dataType,
    value,
    units,
    minValue,
    maxValue,
    choices,
    calcCode,
    calcValue,
    calcUnits,
    required,
    minStringLength,
    maxStringLength,
    validationErrors,
    description
  },
  onPropInputChange
}) => {
  const theme = useTheme();
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
          <span
            htmlFor={code}
            className={clsx(classes.fieldLabel, classes.textInputLabel)}
          >
            {name}
            <div className={classes.numberField}>
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
              />
            </div>
          </span>
          <div className={classes.numberFieldUnits}>{units}</div>
        </div>
      ) : dataType === "boolean" ? (
        <div className={clsx(classes.field, classes.checkboxFieldWrapper)}>
          <span
            htmlFor={code}
            className={clsx(classes.fieldLabel, classes.checkboxFieldLabel)}
          >
            {name}
          </span>
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
          {calcValue ? (
            <>
              <div className={classes.unitsCaption}>{units}</div>
              <div className={classes.calcUnitsCaption}>
                {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
                  calcUnits || ""
                }`}
              </div>
            </>
          ) : null}
        </div>
      ) : dataType === "choice" ? (
        <div className={clsx(classes.field, classes.selectFieldWrapper)}>
          <span
            htmlFor={code}
            className={clsx(classes.fieldLabel, classes.selectFieldLabel)}
          >
            {name}
          </span>
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
          <div className={classes.calcUnitsCaption}>
            {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
              calcUnits || ""
            }`}
          </div>
        </div>
      ) : dataType === "string" || dataType === "textarea" ? (
        <div
          className={clsx(classes.field, classes.textFieldWrapper)}
          onBlur={onBlur}
        >
          <span
            htmlFor={code}
            className={
              required
                ? clsx(
                    classes.fieldLabel,
                    classes.textInputLabel,
                    classes.requiredInputLabel
                  )
                : classes.textInputLabel
            }
          >
            {name}
          </span>
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
            />
          ) : (
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
            />
          )}
        </div>
      ) : (
        <div className={clsx(classes.field, classes.miscFieldWrapper)}>
          <span htmlFor={code} className={classes.fieldLabel}>
            {name}
            <div className={classes.baselineIconContainer}>
              {description ? (
                <Popup
                  trigger={
                    <span style={{ cursor: "pointer" }}>
                      <ToolTipIcon id={id} />
                    </span>
                  }
                  position="left center"
                  arrow={true}
                  contentStyle={{ width: "30%" }}
                >
                  {close => {
                    return (
                      <div style={{ margin: "1rem" }}>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: theme.colors.secondary.gray,
                            border: "none",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            cursor: "pointer"
                          }}
                          onClick={close}
                        >
                          <MdClose style={{ height: "20px", width: "20px" }} />
                        </button>
                        <div
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </div>
                    );
                  }}
                </Popup>
              ) : (
                <span />
              )}
            </div>
          </span>
          <div className={classes.codeWrapper} name={code} id={code} />
          <div className={classes.unitsCaption}>{units}</div>
          <div className={classes.calcUnitsCaption}>
            <span id={calcCode} className={classes.calcNumber}>
              {calcCode === "CALC_PARK_RATIO"
                ? Math.round((calcValue || 0) * 100) / 100
                : calcValue
                ? Math.round(calcValue * 100) / 100
                : ""}
            </span>
            <span className={classes.calcUnits}> {calcUnits || ""}</span>
          </div>
        </div>
      )}
      {validationErrors && showValidationErrors ? (
        <div className={classes.field}>
          <div
            className={clsx(
              classes.fieldLabel,
              classes.textInputLabel,
              classes.errorLabel
            )}
          >
            {validationErrors[0]}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

RuleCalculation.propTypes = {
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
    calcCode: PropTypes.string,
    calcValue: PropTypes.number,
    calcUnits: PropTypes.string,
    required: PropTypes.bool,
    minStringLength: PropTypes.number,
    maxStringLength: PropTypes.number,
    validationErrors: PropTypes.array,
    description: PropTypes.string
  }),
  onPropInputChange: PropTypes.func
};

export default RuleCalculation;
