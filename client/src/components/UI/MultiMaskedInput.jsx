import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { MdClose } from "react-icons/md";
import MaskedInput from "./MaskedInput";

const useStyles = createUseStyles(theme => ({
  textInput: {
    flex: "1 1 50%",
    boxSizing: "border-box"
  },
  textInputInvalid: {
    composes: "$textInput",
    border: theme.border.dashedWarning
  },
  textInputInvalidLocal: {
    composes: "$textInput",
    border: theme.border.dashedWarning
  },
  badgeContainer: { display: "flex", flexWrap: "wrap" },
  badge: {
    margin: "0.25em",
    color: theme.colorText,
    backgroundColor: "#DDDDDD",
    borderRadius: "1em",
    padding: "0.1em 0.35em",
    boxShadow: `0px 1px 4px ${theme.colorText}`
  },
  closeBox: {
    marginLeft: "0.2em",
    color: theme.colorText,
    verticalAlign: "middle"
  },
  errorText: {
    color: theme.colorCritical
  }
}));

const MultiMaskedInput = ({
  code,
  value,
  validationErrors,
  mask,
  onChange,
  onError,
  required,
  className,
  partialValue,
  onPartialValueChange
}) => {
  // partialValue is the current value being typed into the input
  // it's value needs to be managed by the parent component,
  // since the parent needs the ability to clear it.
  // onPartialValueChange is used to notify the parent component
  // when partialValue is edited

  const theme = useTheme();
  const classes = useStyles({ theme });

  // value is a comma-separated string - convert to array
  // for use in this component
  const [valueArray, setValueArray] = useState(value ? value.split(",") : []);
  const [inputError, setInputError] = useState(null);

  const handleChange = newValues => {
    // Convert back to comma-separated string for onChange
    onChange({ target: { value: newValues.join(","), name: code } });
  };

  const handleInputChange = e => {
    const digits = e.target.value.replace(/\D/g, "");
    const errorMessage = "Value must be 10 digits";
    if (digits.length === 10) {
      // Discard duplicate entry
      if (valueArray.find(a => a === e.target.value)) {
        onPartialValueChange("");
        setInputError(null);
        onError(null);
        return;
      }
      const newValueArray = [...valueArray, e.target.value];
      setValueArray(newValueArray);
      onPartialValueChange("");
      setInputError("");
      onError("");
      handleChange(newValueArray);
    } else if (digits.length === 0) {
      onPartialValueChange("");
      setInputError(null);
      onError(null);
    } else {
      onPartialValueChange(e.target.value);
      setInputError(errorMessage);
      onError(errorMessage);
    }
  };

  const handleClose = valueToRemove => {
    const newValueArray = valueArray.filter(a => a !== valueToRemove);
    setValueArray(newValueArray);
    handleChange(newValueArray);
  };

  return (
    <div name={code} style={{ width: "100%" }} className={className}>
      <div className={classes.badgeContainer}>
        {!value
          ? null
          : valueArray.map(a => (
              <div className={classes.badge} key={a}>
                {a}
                <MdClose
                  className={classes.closeBox}
                  onClick={() => handleClose(a)}
                />
              </div>
            ))}
      </div>
      <MaskedInput
        mask={mask}
        value={partialValue}
        name={`code ${code}`}
        code={code}
        onChange={handleInputChange}
        className={
          inputError || validationErrors
            ? classes.textInputInvalid
            : classes.textInput
        }
        placeholder={
          valueArray.length === 0 && required ? "required" : "optional"
        }
      />
    </div>
  );
};

MultiMaskedInput.propTypes = {
  code: PropTypes.string.isRequired,
  value: PropTypes.any,
  validationErrors: PropTypes.array,
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  partialValue: PropTypes.string,
  onPartialValueChange: PropTypes.func
};

export default MultiMaskedInput;
