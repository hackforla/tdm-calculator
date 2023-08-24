import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const useStyles = createUseStyles(theme => ({
  addQuestionButton: {
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  },
  text: {
    ...theme.typography.button,
    fontSize: "14px",
    textDecoration: "underline",
    marginLeft: "10px"
  }
}));

export const NewFaqButton = ({ handleOpenNewFAQ }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.addQuestionButton}
      type="input"
      variant="text"
      onClick={handleOpenNewFAQ}
    >
      <div className={classes.text}>{` Add New FAQ `}</div>
    </Button>
  );
};

NewFaqButton.propTypes = {
  handleOpenNewFAQ: PropTypes.func
};
