import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, selectedValues, onSelectionChange }) => {
  const handleOptionChange = e => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    onSelectionChange(selectedOptions);
  };

  return (
    <select multiple onChange={handleOptionChange} value={selectedValues}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired
};

export default Dropdown;
