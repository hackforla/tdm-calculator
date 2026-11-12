import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

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
      color: theme.colorCritical
    }
  },
  input: {
    ...theme.typography.heading2,
    padding: "8px 4em 8px 8px",
    textAlign: "right",
    margin: ".5em 0",
    height: 45,
    width: "50%"
  },
  unit: {
    ...theme.typography.heading2,
    position: "relative",
    marginLeft: "-80px"
  },
  error: {
    color: theme.colorCritical
  },
  resetButtonWrapper: {
    width: "100%"
  }
}));

const ParkingProvidedRuleInput = ({ rule, onInputChange, resetProject }) => {
  const { code, name, value, units, validationErrors, required } = rule;
  const classes = useStyles();
  const requiredStyle = required && classes.requiredInputLabel;
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [spacesProvided, setSpacesProvided] = useState(value ?? "");
  const [inputError, setInputError] = useState("");

  const errorMessage =
    inputError || (showValidationErrors && validationErrors?.[0]);

  const updateSpaceProvided = nextvalue => {
    setShowValidationErrors(true);

    if (!/^[0-9]*$/.test(nextvalue)) {
      setInputError("Use numbers only");
      return;
    }

    setInputError("");
    setSpacesProvided(nextvalue);
    onInputChange({
      target: { name: code, value: nextvalue }
    });
  };

  const handleChange = e => {
    updateSpaceProvided(e.target.value);
  };

  const handleClear = () => {
    updateSpaceProvided("");
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
      <div>
        <div>
          <input
            className={classes.input}
            autoFocus
            type="text"
            inputMode="numeric"
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? `${code}-error` : undefined}
            value={spacesProvided}
            onChange={handleChange}
            name={code}
            id={code}
            data-testid={code}
            onBlur={onBlur}
          />
          <span className={classes.unit}>&nbsp;{units}</span>
        </div>

        {errorMessage ? (
          <div id={`${code}-error`} className={classes.error} role="alert">
            {errorMessage}
          </div>
        ) : null}
      </div>
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
