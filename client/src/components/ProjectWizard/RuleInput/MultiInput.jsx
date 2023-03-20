import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

import InputMask from "react-input-mask";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";

const useStyles = createUseStyles({
  textInput: {
    flex: "1 1 50%",
    border: "1px solid #e0e0e0"
  },
  textInputInvalid: {
    composes: "$textInput",
    border: "1px dashed red"
  },
  textInputInvalidLocal: {
    composes: "$textInput",
    border: "1px solid red"
  }
});

const matchLength = value => {
  const dashExpr = /-/g;
  const digitExpr = /^\d+/;

  const nonDash = value.replace(dashExpr, "");
  const digitMatch = nonDash.match(digitExpr);
  const digitLength = digitMatch ? digitMatch[0].length : 0;
  const matchLength =
    digitLength >= 7
      ? digitLength + 2
      : digitLength >= 4
      ? digitLength + 1
      : digitLength;
  return matchLength;
};

const beforeMaskedStateChange = newState => {
  const { value } = newState;

  const endPosition = matchLength(newState.value);
  const selection = { start: endPosition, end: endPosition };
  return { value, selection };
};

const Input = props => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  if (props.isHidden) {
    return <components.Input {...props} />;
  }
  const {
    mask,
    value,
    inputValue,
    validateInput,
    checkAndCreateTag,
    resetAINError
  } = props.selectProps;

  const handleBlur = () => {
    resetAINError();

    const validLength = matchLength(inputValue);
    switch (validLength) {
      case 0:
        return;
      case 12:
        checkAndCreateTag();
        break;
      default:
        validateInput();
    }
  };

  return (
    <div
      className={
        props.selectProps.hasError
          ? classes.textInputInvalidLocal
          : props.selectProps.validationErrors
          ? classes.textInputInvalid
          : classes.textInput
      }
      id={"BIG FAT ID"}
      style={{
        // ValueContainer is grid when there's no value, and flex when there
        // is value
        gridArea: "2/1/2/3",
        flex: "0 0 calc(100% - 3px)",
        width: "calc(100% - 3px)"
      }}
    >
      <InputMask
        type="text"
        mask={mask}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={handleBlur}
        name={props.code}
        id={props.code}
        maxLength={props.maxStringLength}
        autoComplete="off"
        placeholder={value.length ? "Add another" : null}
        beforeMaskedValueChange={beforeMaskedStateChange}
      >
        {inputProps => (
          <input
            {...inputProps}
            // placeholder attribute is hard-coded, as I could not figure out how to pass props to the InputMask,
            // and the only usage is for a required field on page 1 of wizard. (JCD)
            placeholder={props.hasValue ? "optional" : "required"}
            className={classes.textInput}
            style={{
              margin: 0,
              width: "calc(100% - 2 * 0.65rem)",
              border: 0
            }}
          />
        )}
      </InputMask>
    </div>
  );
};
Input.propTypes = {
  isHidden: PropTypes.bool,
  onChange: PropTypes.func,
  code: PropTypes.string,
  maxStringLength: PropTypes.number,
  value: PropTypes.string,
  selectProps: PropTypes.object,
  hasValue: PropTypes.bool
};

const MultiValueContainer = props => {
  return <components.MultiValueContainer {...props} />;
};
MultiValueContainer.propTypes = {
  data: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

const SelectContainer = ({ children, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <components.SelectContainer
      {...props}
      className={
        props.selectProps.hasError
          ? classes.textInputInvalidLocal
          : props.selectProps.validationErrors
          ? classes.textInputInvalid
          : classes.textInput
      }
    >
      {children}
    </components.SelectContainer>
  );
};
SelectContainer.propTypes = {
  children: PropTypes.array,
  selectProps: PropTypes.object.isRequired
};

const customComponents = {
  DropdownIndicator: null,
  Input,
  MultiValueContainer,
  SelectContainer
};

const customStyles = {
  multiValue: (base, state) => {
    const validLength = matchLength(state.data.value);
    const allValid = validLength === 12;
    const style = {
      ...base,
      marginLeft: "0.5em",
      marginBottom: "0.5em",
      borderRadius: "1em",
      paddingLeft: "0.2em",
      boxShadow: "0px 1px 4px #5C5E60"
    };
    if (!allValid) {
      return {
        ...style,
        border: "1px solid #FF0000",
        backgroundColor: "#F58080"
      };
    } else {
      return {
        ...style,
        backgroundColor: "#CFD3D8"
      };
    }
  },
  container: base => ({
    ...base,
    width: "300px",
    border: 0
  }),

  control: base => ({
    ...base,
    minHeight: "unset",
    margin: 0,
    border: 0
  }),
  input: base => ({
    ...base,
    width: "100%"
  }),
  valueContainer: base => ({
    ...base,
    padding: 0,
    margin: 0,
    border: 0,
    width: "100%"
  })
};

const createOption = label => ({
  label,
  value: label
});

const toOptions = value => {
  if (!value) return [];

  const options = value.split(",").reduce((acc, val) => {
    return [...acc, createOption(val)];
  }, []);
  return options;
};

const MultiInput = ({
  code,
  value,
  validationErrors,
  mask,
  onChange,
  onError,
  setShowValidationErrors
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const valueOptions = toOptions(value);

  const resetAINError = () => {
    setHasError(false);
    onError(null);
  };
  const checkAndCreateTag = () => {
    // don't create duplicate tag
    const indexValue = valueOptions.findIndex(
      option => option.value === inputValue
    );
    const isDuplicate = indexValue !== -1;
    const newValue = !isDuplicate
      ? [...valueOptions, createOption(inputValue)]
      : valueOptions;

    handleChange(newValue);
    setInputValue("");

    resetAINError();
  };
  const validateInput = () => {
    setShowValidationErrors(true);
    setHasError(true);
    onError("Each AIN/APN number needs ten digits");
  };

  const handleChange = value => {
    onChange(
      new CustomEvent("newTag", {
        detail: {
          name: code,
          value: value,
          type: "tag"
        }
      })
    );
  };
  const handleInputChange = inputValue => {
    setInputValue(inputValue);
  };
  const handleKeyDown = event => {
    const validLength = matchLength(inputValue);

    switch (validLength) {
      case 0:
        // don't create tag if no input
        return;
      case 12:
        // create tag if pressing any key after input is full (except backspace)
        switch (event.key) {
          case "Backspace":
            break;
          default:
            checkAndCreateTag();
            event.preventDefault();
        }
        break;
      default:
        // display error if input is incomplete
        switch (event.key) {
          case "Enter":
          case ",":
            validateInput();
            event.preventDefault();
            break;
          case "Tab":
            validateInput();
            break;
          default:
            resetAINError();
        }
    }
  };

  return (
    <CreatableSelect
      name={code}
      id={code}
      className={
        validationErrors ? classes.textInputInvalid : classes.textInput
      }
      components={customComponents}
      inputValue={inputValue}
      isClearable={false}
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder=""
      value={valueOptions}
      styles={customStyles}
      mask={mask}
      hasError={hasError}
      validationErrors={validationErrors}
      validateInput={validateInput}
      checkAndCreateTag={checkAndCreateTag}
      resetAINError={resetAINError}
    />
  );
};
MultiInput.propTypes = {
  code: PropTypes.string.isRequired,
  value: PropTypes.any,
  validationErrors: PropTypes.array,
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func.isRequired,
  setShowValidationErrors: PropTypes.func.isRequired
};

export default MultiInput;
