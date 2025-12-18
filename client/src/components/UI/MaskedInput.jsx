import React, { useRef, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";

const MaskedInput = props => {
  const { onChange, mask, placeholder, className, code } = props;
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  // After render, set the cursor position
  useLayoutEffect(() => {
    // Ensure the input element is focused and the method is applicable
    if (inputRef.current) {
      inputRef.current.focus();
      // Set the selection range: select "Hello" (indices 0 to 5)
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]); // Re-run when the selection state changes

  const mergeMaskWithValue = value => {
    const digits = value.replace(/\D/g, "");
    let formattedValue = "";
    let cursorPosition = 0;
    for (let i = 0, j = 0; i < mask.length; i++) {
      if (mask[i] === "9" && j < digits.length) {
        formattedValue += digits[j];
        j++;
        cursorPosition = i + 1;
      } else {
        formattedValue += mask[i] === "9" ? "_" : mask[i];
      }
    }
    setCursorPosition(cursorPosition);
    return formattedValue;
  };

  const onChangeHandler = e => {
    const inputValue = e.target.value;
    const formattedValue = mergeMaskWithValue(inputValue);

    let target = { ...e.target, value: formattedValue };
    onChange({ ...e, target });
  };

  return (
    <div>
      <input
        name={code}
        ref={inputRef}
        type="text"
        {...props}
        onChange={onChangeHandler}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

MaskedInput.propTypes = {
  value: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  mask: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default MaskedInput;
