import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

RadioButton.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default RadioButton;
