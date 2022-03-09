import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

import InputMask from "react-input-mask";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";

const useStyles = createUseStyles({
  textInput: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    border: "1px solid #e0e0e0"
  },
  textInputInvalid: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    border: "1px dashed red"
  },
  textInputInvalidLocal: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
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
  if (props.isHidden) {
    return <components.Input {...props} />;
  }
  const { mask, value } = props.selectProps;
  return (
    <InputMask
      type="text"
      mask={mask}
      value={props.value || ""}
      onChange={props.onChange}
      name={props.code}
      id={props.code}
      maxLength={props.maxStringLength}
      autoComplete="off"
      placeholder={value.length ? "Add another" : null}
      beforeMaskedValueChange={beforeMaskedStateChange}
      style={{
        border: 0,
        width: "100%",
        padding: "0.5em 1em",
        margin: 0
      }}
    />
  );
};
Input.propTypes = {
  isHidden: PropTypes.bool,
  onChange: PropTypes.func,
  code: PropTypes.string,
  maxStringLength: PropTypes.number,
  value: PropTypes.string,
  selectProps: PropTypes.object
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
      marginRight: "0.5em",
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
    boxSizing: "inherit",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    padding: "0 0.65em",
    margin: "0 1px"
  }),
  control: base => ({
    ...base,
    minHeight: "unset",
    margin: 0,
    border: 0
  }),
  valueContainer: base => ({
    ...base,
    padding: 0,
    margin: 0,
    border: 0
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
  onError
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const valueOptions = toOptions(value);

  const validateTags = useCallback(values => {
    setHasError(false);
    onError(null);

    values.some(value => {
      const validLength = matchLength(value);
      if (validLength !== 12) {
        setHasError(true);
        onError("Each AIN/APN number needs ten digits");
        return true;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!value) return;
    validateTags(value.split(","));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateTags]);

  const handleChange = value => {
    validateTags(
      value.map(tag => {
        return tag.value;
      })
    );
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

    // don't create tag if no input
    if (validLength === 0) return;

    // don't add duplicate tag
    const indexValue = valueOptions.findIndex(
      option => option.value === inputValue
    );
    const isDuplicate = indexValue !== -1;
    const newValue = !isDuplicate
      ? [...valueOptions, createOption(inputValue)]
      : valueOptions;

    // do create tag if pressing any key after input is full (except backspace)
    if (validLength === 12 && event.key !== "Backspace") {
      //console.log("call handleChange");
      handleChange(newValue);

      setInputValue("");
      event.preventDefault();
      return;
    }

    // do create tag if pressing one of the create tag keys
    switch (event.key) {
      case "Enter":
      case "Tab":
      case ",":
        handleChange(newValue);

        setInputValue("");
        event.preventDefault();
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
    />
  );
};
MultiInput.propTypes = {
  code: PropTypes.string.isRequired,
  value: PropTypes.any,
  validationErrors: PropTypes.array,
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func.isRequired
};

export default MultiInput;
