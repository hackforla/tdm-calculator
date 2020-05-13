import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  rule: {
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  numberRule: {
    alignItems: "center"
  },
  name: {
    flexBasis: "70%",
    flexGrow: "1",
    flexShrink: "1"
  },
  nameSmall: {
    flexBasis: "45%",
    flexGrow: "1",
    flexShrink: "1"
  },
  code: {
    flexBasis: "10%",
    flexGrow: "0",
    flexShrink: "1"
  },
  units: {
    flexBasis: "10%",
    marginLeft: "1em",
    flexGrow: "0",
    flexShrink: "1"
  },
  calcUnits: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  },
  select: {
    flexBasis: "45%",
    flexGrow: "1",
    flexShrink: "1"
  },
  stringInput: {
    flexBasis: "65%",
    flexGrow: "0",
    flexShrink: "1"
  }
});

const RuleInput = ({
  rule: { code, name, dataType, value, units, choices, calcValue, calcUnits },
  onInputChange
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div className={clsx(classes.rule, classes.numberRule)}>
          <div className={classes.name}>{name}</div>
          <input
            type="text"
            className={classes.code}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          />
          <div className={classes.units}>{units}</div>
          <div className={classes.calcUnits}>
            {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
              calcUnits || ""
            }`}
          </div>
        </div>
      ) : dataType === "boolean" ? (
        <div className={classes.rule}>
          <div className={classes.name}>{name}</div>
          <input
            type="checkbox"
            className={classes.code}
            value={true}
            checked={!!value}
            onChange={onInputChange}
            name={code}
          />
          <div className={classes.units}>{units}</div>
          <div className={classes.calcUnits}>
            {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
              calcUnits || ""
            }`}
          </div>
        </div>
      ) : dataType === "choice" ? (
        <div className={classes.rule}>
          <div className={classes.nameSmall}>{name}</div>
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
          <div className={classes.calcUnits}>
            {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
              calcUnits || ""
            }`}
          </div>
        </div>
      ) : dataType === "string" ? (
        <div className={classes.rule}>
          <div className={classes.nameSmall}>{name}</div>
          <input
            type="text"
            className={classes.stringInput}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          />
        </div>
      ) : (
        <div className={classes.rule}>
          <div className={classes.name}>{name}</div>
          <div className={classes.code} name={code} />
          <div className={classes.units}>{units}</div>
          <div className={classes.calcUnits}>
            {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
              calcUnits || ""
            }`}
          </div>
        </div>
      )}
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
    choices: PropTypes.array,
    calcValue: PropTypes.number,
    calcUnits: PropTypes.string
  }),
  onInputChange: PropTypes.func
};

export default RuleInput;
