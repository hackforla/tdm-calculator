import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import classNames from "classnames";
import { jssTheme } from "styles/theme";

UniversalSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  isSearchable: PropTypes.bool,
  maxMenuHeight: PropTypes.any
};

export default function UniversalSelect({
  value,
  defaultValue,
  options,
  onChange,
  name,
  id,
  disabled,
  autoFocus,
  className,
  isSearchable = false,
  maxMenuHeight
}) {
  // To make UniversalSelect compatible with a standard react <select> component, the onChange method should be passed
  // an object that at least looks like an event object.
  const handleSelectChange = selectedOption => {
    onChange({
      target: {
        value: selectedOption ? selectedOption.value : "",
        name: name
      }
    });
  };

  const setFocusStyle = state => {
    return state.isFocused || state.menuIsOpen
      ? {
          border: `none`,
          outline: `2px solid ${jssTheme.colors.secondary.linkBlue}`
        }
      : {
          border: `1px solid gray`,
          outline: "none"
        };
  };

  return (
    <Select
      aria-label={name}
      className={classNames(className)}
      autoFocus={autoFocus}
      onChange={handleSelectChange}
      // To make value compatible with a standard react <select> component, value should be passed the value of
      // the selected option.
      value={options.find(o => o.value == value) || ""}
      defaultValue={defaultValue}
      name={name}
      inputId={id}
      isDisabled={disabled}
      isSearchable={isSearchable}
      options={options}
      maxMenuHeight={maxMenuHeight}
      styles={{
        container: (provided, state) => ({
          ...provided,
          ...setFocusStyle(state),
          boxShadow:
            state.isFocused || state.menuIsOpen ? "none" : provided.boxShadow,
          borderRadius: "3px",
          padding: 0
        }),
        option: (provided, state) => ({
          ...provided,
          fontSize: "15px", // Set your desired font size for options
          padding: "8px", // Set padding to 8 for options
          backgroundColor: state.isSelected
            ? "#1967D2"
            : state.isFocused
              ? "#EEF1F4"
              : "white", // Change background color based on state
          color: state.isSelected ? "white" : "black", // Ensure text is readable on dark background,
          boxShadow: "10px"
        }),
        singleValue: provided => ({
          ...provided,
          fontSize: "15px",
          color: "black"
        }),
        menu: provided => ({
          ...provided,
          padding: "0", // Set padding of the dropdown menu to 0
          border: "1px solid black",
          boxShadow: "none",
          marginTop: "1px",
          borderRadius: "0"
        }),
        menuList: provided => ({
          ...provided,
          padding: 0
        }),
        control: provided => ({
          ...provided,
          padding: "0",
          minHeight: "auto",
          border: "none",
          boxShadow: "none",
          outline: "none"
        }),
        dropdownIndicator: provided => ({
          ...provided,
          padding: "2px"
        }),
        clearIndicator: provided => ({
          ...provided,
          padding: "2px"
        }),
        valueContainer: provided => ({
          ...provided,
          paddingLeft: "4px",
          padding: "0"
        }),
        indicatorSeparator: provided => ({
          ...provided,
          display: "none"
        })
      }}
    />
  );
}
