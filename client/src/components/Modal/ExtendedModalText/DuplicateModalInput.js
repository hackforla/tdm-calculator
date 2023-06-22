import React from "react";
import { createUseStyles } from "react-jss";
import { PropTypes } from "prop-types";

const useStyles = createUseStyles({
  inputField: {
    boxSizing: "border-box",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "16px",
    border: "1px solid #979797",
    marginTop: "8px"
  }
});

const DuplicateModalInput = () => {
  const classes = useStyles();

  return (
    <input
      placeholder="Name of Duplicated Project"
      type="text"
      id="duplicateName"
      name="duplicateName"
      className={classes.inputField}
      // value={}
      // onChange={}
    />
  );
};

DuplicateModalInput.propTypes = {};

export default DuplicateModalInput;
