import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import RequiredFieldContext from "../../contexts/RequiredFieldContext";

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
  numberField: {
    flexBasis: "20%",
    flexGrow: "1",
    flexShrink: "1"
  },
  numberFieldUnits: {
    flexBasis: "20%",
    marginLeft: "1em",
    flexGrow: "0",
    flexShrink: "1"
  },
  input: {
    padding: "0.1em",
    width: "auto",
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
  textInputLabel: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
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
    color: "red"
  }
});

const WizardRuleInput = ({
  rule: {
    id,
    calculationId,
    code,
    name,
    category,
    dataType,
    value,
    units,
    minValue,
    maxValue,
    functionBody,
    displayOrder,
    cssClass,
    calculationPanelId,
    panelName,
    panelDisplayOrder,
    choices,
    calcValue,
    calcUnits
  },
  onGenericInputChange
}) => {
  const classes = useStyles();
  const isRequired = name.slice(-1) === "*";
  const displayName = isRequired ? name.slice(0, -1) : name;
  const setUnfilledRequired = useContext(RequiredFieldContext)[1];
  const [error, setError] = useState("");

  const updateRequiredInput = e => {
    if (isRequired) {
      const input = { [code]: e.target.value === "" };
      if (input[code]) {
        setError("Input cannot be empty");
      } else {
        setError("");
      }
      setUnfilledRequired(inputs => ({ ...inputs, ...input }));
    }
  };

  const onInputChange = e => {
    updateRequiredInput(e);
    onGenericInputChange(e);
  };

  const onBlur = e => {
    updateRequiredInput(e);
  };

  const updateInput = () => {
    const input = { [code]: isRequired };
    if (isRequired) {
      setUnfilledRequired(inputs => ({ ...inputs, ...input }));
    }
  };

  useEffect(() => {
    updateInput();
  }, []);

  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div className={clsx(classes.field, classes.numberFieldWrapper)}>
          <div className={classes.textInputLabel}>{displayName}</div>
          <div className={classes.numberField}>
            <input
              className={classes.input}
              type="text"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              min={minValue}
              max={maxValue}
            />
          </div>
          <div className={classes.numberFieldUnits}>{units}</div>
          <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "boolean" ? (
        <div className={clsx(classes.field, classes.checkboxFieldWrapper)}>
          <div className={classes.checkboxFieldLabel}>{displayName}</div>
          <input
            type="checkbox"
            className={classes.checkbox}
            value={true}
            checked={!!value}
            onChange={onInputChange}
            name={code}
          />
          {calcValue ? (
            <>
              <div className={classes.unitsCaption}>{units}</div>
              <div className={classes.calcUnitsCaption}>
                {`${
                  calcValue ? Math.round(calcValue * 100) / 100 : ""
                } ${calcUnits || ""}`}
              </div>
            </>
          ) : null}
        </div>
      ) : dataType === "choice" ? (
        <div className={clsx(classes.field, classes.selectFieldWrapper)}>
          <div className={classes.selectFieldLabel}>{displayName}</div>
          <select
            className={classes.select}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          >
            {choices.map(choice => (
              <option key={choice.id} value={choice.id}>
                {choice.name}
              </option>
            ))}
          </select>
          <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "string" || dataType === "textarea" ? (
        <div
          className={clsx(classes.field, classes.textFieldWrapper)}
          onBlur={onBlur}
        >
          <div
            className={
              isRequired
                ? clsx(classes.textInputLabel, classes.requiredInputLabel)
                : classes.textInputLabel
            }
          >
            {displayName}
          </div>
          {dataType === "string" ? (
            <input
              type="text"
              className={classes.textInputLabel}
              value={value || ""}
              onChange={onInputChange}
              name={code}
            />
          ) : (
            <textarea
              className={classes.textareaLabel}
              value={value || ""}
              onChange={onInputChange}
              name={code}
            />
          )}
        </div>
      ) : (
        <div className={clsx(classes.field, classes.miscFieldWrapper)}>
          <div className={classes.miscFieldLabel}>{displayName}</div>
          <div className={classes.codeWrapper} name={code} />
          <div className={classes.unitsCaption}>{units}</div>
          <div className={classes.calcUnitsCaption}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      )}
      <div className={clsx(classes.textInputLabel, classes.errorLabel)}>
        {error}
      </div>
    </React.Fragment>
  );
};

WizardRuleInput.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    calculationId: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    value: PropTypes.any,
    units: PropTypes.string,
    functionBody: PropTypes.string,
    cssClass: PropTypes.string,
    panelDisplayOrder: PropTypes.number.isRequired,
    displayOrder: PropTypes.number.isRequired,
    calculationPanelId: PropTypes.number.isRequired,
    panelName: PropTypes.string
  }),
  onGenericInputChange: PropTypes.func
};

export default WizardRuleInput;
