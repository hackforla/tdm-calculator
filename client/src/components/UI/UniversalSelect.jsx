import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import classNames from "classnames";

UniversalSelect.propTypes = {
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
  className: PropTypes.string
};

export default function UniversalSelect({
  defaultValue,
  options,
  onChange,
  name,
  id,
  disabled,
  autoFocus,
  className
}) {
  const handleSelectChange = selectedOption => {
    onChange({
      target: {
        value: selectedOption ? selectedOption.value : "",
        name: name
      }
    });
  };
  console.log(defaultValue);
  return (
    <Select
      className={classNames(className)}
      autoFocus={autoFocus}
      onChange={handleSelectChange}
      defaultValue={defaultValue}
      name={name}
      inputId={id}
      isDisabled={disabled}
      options={options}
      styles={{
        container: (provided, state) => ({
          ...provided,
          border:
            state.isFocused || state.menuIsOpen
              ? "1px solid black"
              : "1px solid gray",
          boxShadow:
            state.isFocused || state.menuIsOpen ? "none" : provided.boxShadow,
          outline: "none",
          borderRadius: "3px",
          padding: 0
        }),
        option: (provided, state) => ({
          ...provided,
          fontSize: "15px", // Set your desired font size for options
          padding: "2px", // Set padding to 0 for options
          backgroundColor: state.isSelected
            ? "#1967D2ff"
            : state.isFocused
            ? "#e5e7eb"
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
