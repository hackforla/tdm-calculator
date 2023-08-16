import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const useStyles = createUseStyles({
  addQuestionButton: {
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

export const NewFaqButton = ({ handleOpenNewFAQ }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.addQuestionButton}
      type="input"
      variant="text"
      onClick={handleOpenNewFAQ}
    >
      ADD NEW QUESTION
    </Button>
  );
};

NewFaqButton.propTypes = {
  handleOpenNewFAQ: PropTypes.func
};
