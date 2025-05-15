import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const useStyles = createUseStyles({
  radioButtonInput: {
    display: "none"
  },
  radioIcon: {
    fontSize: "1.5em",
    color: "#939393",
    verticalAlign: "middle",
    marginRight: "5px",
    cursor: "pointer",
    transition: "color 0.2s ease"
  },
  radioIconChecked: {
    composes: "$radioIcon",
    color: "#1967D2",
    "&:hover": {
      color: "#1450A4"
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
      <span role="img" aria-label={checked ? "Selected" : "Not selected"}>
        {checked ? (
          <MdRadioButtonChecked className={classes.radioIconChecked} />
        ) : (
          <MdRadioButtonUnchecked className={classes.radioIcon} />
        )}
      </span>
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
