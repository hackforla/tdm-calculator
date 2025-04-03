import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  radioButtonInput: {
    verticalAlign: "middle",
    padding: "0",
    marginRight: "5px",
    appearance: "none",
    WebkitAppearance: "none",
    borderRadius: "50%",
    boxShadow: "0 0 0 1px #939393",
    width: "1em",
    height: "1em",
    "&:hover": {
      boxShadow: "0 0 0 1px #000000"
    },
    "&:checked": {
      border: "3px solid #FFF",
      background: "#1967D2",
      boxShadow: "0 0 0 1px #1967D2",
      "&:hover": {
        background: "#1450A4",
        boxShadow: "0 0 0 1px #1450A4"
      }
    }
  }
});

const RadioButton = ({ label, value, checked, onChange }) => {
  const classes = useStyles();

  return (
    <label style={{ margin: "0.5em" }}>
      <input
        className={classes.radioButtonInput}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span style={{ verticalAlign: "middle" }}>{label}</span>
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
