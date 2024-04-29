import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <label style={{ margin: "0.5em" }}>
      <input
        style={{ verticalAlign: "middle" }}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span style={{ verticalAlign: "middle" }}> {label}</span>
    </label>
  );
};

RadioButton.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

export default RadioButton;
