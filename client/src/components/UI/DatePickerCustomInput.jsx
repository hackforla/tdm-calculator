import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const DatePickerCustomInput = forwardRef(
  ({ value, onClick, onChange }, ref) => (
    <input
      type="text"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      value={value}
      style={{ width: "6rem", padding: "0.1rem", border: "1px solid black" }}
    />
  )
);

DatePickerCustomInput.displayName = "DatePickerCustomInput";

// DatePickerCustomInput.defaultProps = {
//   style:
// };

DatePickerCustomInput.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

export default DatePickerCustomInput;
