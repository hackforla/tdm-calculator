import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = createUseStyles({
  ruleMeasure: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  baseline: {
    alignItems: "baseline"
  },
  numberName: {
    flexBasis: "60%",
    flexGrow: "1",
    flexShrink: "1"
  },
  inputWrapper: {
    flexBasis: "40%",
    flexGrow: "1",
    flexShrink: "1",
    textAlign: "right"
  },
  input: {
    padding: "0.1em",
    width: "auto",
    textAlign: "right"
  },
  value: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "0"
  },
  wideName: {
    flexBasis: "70%",
    flexGrow: "1",
    flexShrink: "1"
  },
  boolInputWrapper: {
    flexBasis: "10%",
    flexGrow: "0",
    flexShrink: "0",
    marginRight: "0",
    padding: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  choiceName: {
    flexBasis: "40%",
    flexGrow: "1",
    flexShrink: "1"
  },
  stringField: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  code: {
    flexBasis: "10%",
    flexGrow: "0",
    flexShrink: "1"
  },
  miscValue: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  }
});

const WizardRuleMeasure = ({
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
    calcUnits,
    calcMinValue,
    calcMaxValue
  },
  onInputChange
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div className={classes.ruleMeasure}>
          <div className={classes.numberName}>{name}</div>
          <div className={classes.inputWrapper}>
            <input
              className={classes.input}
              type="number"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              min={minValue}
              max={maxValue}
            />
          </div>
          <div className={classes.value}>
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div className={classes.value}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "boolean" ? (
        <div className={classes.ruleMeasure}>
          <div className={classes.wideName}>{name}</div>
          <div className={classes.boolInputWrapper}>
            <input
              type="checkbox"
              value={true}
              checked={!!value}
              onChange={onInputChange}
              name={code}
            />
          </div>
          <div className={classes.value}>
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div className={classes.value}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "choice" ? (
        <div className={clsx(classes.ruleMeasure, classes.baseline)}>
          <div className={classes.choiceName}>{name}</div>
          <div className={classes.inputWrapper}>
            <select
              width="100%"
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
          </div>
          <div className={classes.value}>
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div className={classes.value}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "string" ? (
        <div className={classes.ruleMeasure}>
          <div className={classes.stringField}>{name}</div>
          <input
            type="text"
            className={classes.stringField}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          />
        </div>
      ) : (
        <div className={clsx(classes.ruleMeasure, classes.baseline)}>
          <div className={classes.wideName}>{name}</div>
          <div className={classes.code} name={code} />
          <div className={classes.miscValue}>
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div className={classes.miscValue}>
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

WizardRuleMeasure.propTypes = {
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
  onInputChange: PropTypes.func
};

export default WizardRuleMeasure;
