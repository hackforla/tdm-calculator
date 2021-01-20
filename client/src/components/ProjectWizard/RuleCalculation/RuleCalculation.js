import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";

const useStyles = createUseStyles({
  field: {
    margin: "1em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
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
    flexGrow: "0",
    flexShrink: "1"
  },
  calcUnitsCaption: {
    flexBasis: "33%",
    marginRight: "0.5em",
    textAlign: "left",
    flexGrow: "0",
    flexShrink: "1"
  },
  calcNumber: {
    fontSize: 40
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
    border: "1px dashed red"
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
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
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
  baselineIconContainer: {
    width: 16,
    height: 16,
    display: "inline-block"
  }
});

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
          <label htmlFor={code} className={classes.textInputLabel}>
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
          </label>
          <div className={classes.numberFieldUnits}>{units}</div>
          {/*} <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>*/}
        </div>
      ) : dataType === "boolean" ? (
        <div className={clsx(classes.field, classes.checkboxFieldWrapper)}>
          <label htmlFor={code} className={classes.checkboxFieldLabel}>
            {name}
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
          <label htmlFor={code} className={classes.selectFieldLabel}>
            {name}
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
          <label
            htmlFor={code}
            className={
              required
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
          >
            {name}
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
          <label
            htmlFor={code}
            className={classes.miscFieldLabel}
            data-for={"main" + id}
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {name}
            <div className={classes.baselineIconContainer}>
              {description ? <ToolTipIcon /> : <span />}
            </div>
          </label>
          <div className={classes.codeWrapper} name={code} id={code} />
          <div className={classes.unitsCaption}>{units}</div>
          <div className={classes.calcUnitsCaption}>
            <span id={calcCode} className={classes.calcNumber}>
              {calcValue ? Math.round(calcValue * 100) / 100 : ""}
            </span>
            <span className={classes.calcUnits}> {calcUnits || ""}</span>
          </div>
          <ReactTooltip
            id={"main" + id}
            place="right"
            type="info"
            effect="float"
            multiline={true}
            style={{
              width: "25vw"
            }}
            textColor="#32578A"
            backgroundColor="#F7F9FA"
            borderColor="rgb(30, 36, 63)"
            border={true}
            offset={{ right: 20 }}
          />
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
    calcValue: PropTypes.any,
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
