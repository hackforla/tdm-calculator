import React from "react";
import Quill from "../Quill";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  answerContainer: {
    width: "100%"
  },
  answerInput: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

export const Answer = ({
  admin,
  answer,
  handleAnswerChange,
  isEditAnswer,
  setIsEditAnswer,
  onSetFaq
}) => {
  const classes = useStyles();

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
            onChange={handleAnswerChange}
            className={classes.answerInput}
          />
        </div>
      ) : (
        <div
          onClick={() => admin && setIsEditAnswer(!isEditAnswer)}
          style={{ display: "flex" }}
        >
          <p
            style={{ marginTop: "0.5em", fontWeight: "bold" }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
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
