import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Question } from "./Question";
import { Answer } from "./Answer";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  faqContainer: {
    display: "flex",
    flexDirection: "column"
  }
});

export const NewFaqContainer = ({
  newQuestion,
  newAnswer,
  handleNewQuestionChange,
  handleNewAnswerChange,
  handleSaveNewFAQ,
  handleCloseNewFAQ
}) => {
  const classes = useStyles();

  const onSetNewFaq = useCallback(() => {
    if (newQuestion && newAnswer) {
      handleSaveNewFAQ();
      handleCloseNewFAQ();
    }
  }, [newQuestion, newAnswer, handleCloseNewFAQ, handleSaveNewFAQ]);

  return (
    <div className={classes.faqContainer}>
      <Question
        admin={true}
        question={newQuestion}
        isEditQuestion={true}
        handleQuestionChange={handleNewQuestionChange}
        onSetFaq={onSetNewFaq}
      />
      <Answer
        admin={true}
        answer={newAnswer}
        onSetFaq={onSetNewFaq}
        isEditAnswer={true}
        handleAnswerChange={handleNewAnswerChange}
      />
    </div>
  );
};

NewFaqContainer.propTypes = {
  newQuestion: PropTypes.string,
  newAnswer: PropTypes.string,
  handleNewQuestionChange: PropTypes.func,
  handleNewAnswerChange: PropTypes.func,
  handleSaveNewFAQ: PropTypes.func,
  handleCloseNewFAQ: PropTypes.func
};
