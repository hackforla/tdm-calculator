import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

// default radio button css
// const useStyles = createUseStyles({
//   radioButtonInput: {
//     // display: "none",
//     verticalAlign: "middle",
//     padding: "0",
//     marginRight: "5px",
//     appearance: "none",
//     borderRadius: "50%",
//     // boxShadow: "0 0 0 1px #939393",
//     width: "1em",
//     height: "1em",
//     "&:hover": {
//       boxShadow: "0 0 0 1px #000000"
//     },
//     "&:checked": {
//       border: "3px solid #FFF",
//       background: "#1967D2",
//       boxShadow: "0 0 0 1px #1967D2",
//       "&:hover": {
//         background: "#1450A4",
//         boxShadow: "0 0 0 1px #1450A4"
//       }
//     }
//   },
//   hiddenRadioInput: {
//     display: "none"
//   }
// });

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
