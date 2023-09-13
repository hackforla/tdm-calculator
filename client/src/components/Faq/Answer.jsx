import React from "react";
import Quill from "../Quill";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { Interweave } from "interweave";

const useStyles = createUseStyles(theme => ({
  answerContainer: {
    width: "100%"
  },
  answerInput: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  answerText: {
    ...theme.typography.subHeading,
    textAlign: "inherit",
    padding: 8,
    fontWeight: 22,
    cursor: admin => (admin ? "pointer" : "default"),
    "&:hover": {
      textDecoration: admin => admin && "underline"
    }
  }
}));

export const Answer = ({
  admin,
  answer,
  handleAnswerChange,
  isEditAnswer,
  setIsEditAnswer,
  onSetFaq
}) => {
  const classes = useStyles(admin);

  const handleSetFAQ = event => {
    // Check if the relatedTarget is within the Answer component
    if (
      event.relatedTarget &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return; // Skip calling onSetFaq
    }

    onSetFaq();
  };
  return (
    <div onBlur={handleSetFAQ} className={classes.answerContainer}>
      {isEditAnswer ? (
        <div style={{ display: "flex", width: "100%" }}>
          <Quill
            value={answer}
            placeholder="Answer..."
            onChange={handleAnswerChange}
            className={classes.answerInput}
          />
        </div>
      ) : (
        <div
          onClick={() => admin && setIsEditAnswer(!isEditAnswer)}
          style={{ display: "flex" }}
        >
          <div className={classes.answerText}>
            <Interweave content={answer} />
          </div>
        </div>
      )}
    </div>
  );
};

Answer.propTypes = {
  admin: PropTypes.bool,
  answer: PropTypes.string,
  handleAnswerChange: PropTypes.func,
  isEditAnswer: PropTypes.bool,
  setIsEditAnswer: PropTypes.func,
  onSetFaq: PropTypes.func
};
