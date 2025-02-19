import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import debounce from "lodash/debounce";
import ResetButtons from "../WizardPages/ResetButtons";

const useStyles = createUseStyles(theme => ({
  parkingProvidedWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2em",
    marginTop: "1em"
  },
  label: {
    ...theme.typography.heading2,
    marginTop: "1em"
  },
  requiredInputLabel: {
    "&:after": {
      content: '" *"',
      color: theme.colors.warning
    }
  },
  inputContainer: {
    width: "100%",
    textAlign: "center"
  },
  input: {
    ...theme.typography.heading2,
    padding: "8px 4em 8px 8px",
    textAlign: "right",
    margin: ".5em auto",
    height: 45,
    width: "50%"
  },
  unit: {
    ...theme.typography.heading2,
    position: "relative",
    marginLeft: "-80px"
  },
  error: {
    color: theme.colors.warning
  },
  resetButtonWrapper: {
    width: "100%"
  }
}));

const ParkingProvidedRuleInput = ({ rule, onInputChange, resetProject }) => {
  const { code, name, value, units, maxValue, validationErrors, required } =
    rule;
  const classes = useStyles();
  const requiredStyle = required && classes.requiredInputLabel;
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [spacesProvided, setSpacesProvided] = useState(value || "");

  const onDebounceInputChange = useMemo(
    () => debounce(e => onInputChange(e), 750),
    [onInputChange]
  );

  const handleChange = e => {
    setShowValidationErrors(true);
    setSpacesProvided(e.target.value);
    onDebounceInputChange(e);
  };

  const handleClear = e => {
    setShowValidationErrors(true);
    setSpacesProvided("");
    onDebounceInputChange(e);
  };

  const onBlur = () => {
    setShowValidationErrors(true);
  };

  return (
    <div className={classes.parkingProvidedWrapper}>
      <div className={classes.resetButtonWrapper}>
        <ResetButtons
          uncheckAll={handleClear}
          resetProject={resetProject}
          rightAlignStyle={{ marginRight: "-2em" }}
        />
      </div>
      <label htmlFor={code} className={clsx(classes.label, requiredStyle)}>
        {name}
      </label>
      <div className={classes.inputContainer}>
        <input
          className={classes.input}
          autoFocus
          type="text"
          value={spacesProvided}
          onChange={handleChange}
          name={code}
          id={code}
          data-testid={code}
          max={maxValue}
          onBlur={onBlur}
          maxLength="7"
        />
        <span className={classes.unit}>&nbsp;{units}</span>
      </div>

      {validationErrors && showValidationErrors ? (
        <div className={classes.error}>{validationErrors[0]}</div>
      ) : null}
    </div>
  );
};

ParkingProvidedRuleInput.propTypes = {
  rule: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    units: PropTypes.string,
    maxValue: PropTypes.number,
    validationErrors: PropTypes.array,
    required: PropTypes.bool.isRequired
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired
};

export default ParkingProvidedRuleInput;
