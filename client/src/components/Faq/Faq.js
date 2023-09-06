import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

import { Question } from "./Question";
import { FaqButtonContainer } from "./FaqButtonContainer";
import { Answer } from "./Answer";

const useStyles = createUseStyles({
  faqContainer: {
    display: "flex",
    flexDirection: "column"
  },
  collapseFlexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "2em"
  },
  expandFlexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
    minHeight: "2em",
    padding: 4,
    border: "2px solid #a6c439"
  },
  faqPlusMinusIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  faqExpandIcon: {
    display: "flex",
    alignItems: "flex-start",
    fontSize: "25px",
    paddingTop: "0.25em",
    marginTop: 0,
    marginRight: "0.5em",
    flex: "0 0 auto"
  }
});

const Faq = props => {
  const {
    faq,
    admin,
    expandFaq,
    collapseFaq,
    dragHandleProps,
    handleEditFAQ,
    handleDeleteFAQ
  } = props;
  const classes = useStyles();
  const [answer, setAnswer] = useState(faq.answer);
  const [question, setQuestion] = useState(faq.question);
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = ans => {
    setAnswer(ans);
  };

  const handleSaveFAQ = useCallback(() => {
    handleEditFAQ(faq.id, question, answer);
  }, [question, answer, faq.id, handleEditFAQ]);

  const onDeleteFAQ = () => {
    handleDeleteFAQ(faq.id);
  };

  const onSetFaq = useCallback(() => {
    setIsEditQuestion(false);
    setIsEditAnswer(false);
    handleSaveFAQ();
  }, [handleSaveFAQ]);

  useEffect(() => {
    if (!admin) {
      setIsEditQuestion(false);
      setIsEditAnswer(false);
    }
  }, [admin]);

  const showFullOptions = useCallback(
    (isHover = false) => {
      admin && setIsHovered(isHover);
    },
    [admin]
  );

  return (
    <div className={classes.faqContainer}>
      <div
        className={
          faq.expand
            ? classes.expandFlexContainer
            : classes.collapseFlexContainer
        }
        onMouseEnter={() => showFullOptions(true)}
        onMouseLeave={() => showFullOptions()}
      >
        <Question
          admin={admin}
          onSetFaq={onSetFaq}
          question={question}
          isEditQuestion={isEditQuestion}
          handleQuestionChange={handleQuestionChange}
          setIsEditQuestion={setIsEditQuestion}
        />
        <FaqButtonContainer
          isHovered={isHovered}
          admin={admin}
          dragHandleProps={dragHandleProps}
          onDeleteFAQ={onDeleteFAQ}
          setIsEditAnswer={setIsEditAnswer}
          isEditAnswer={isEditAnswer}
          onSetFaq={onSetFaq}
          expandFaq={expandFaq}
          collapseFaq={collapseFaq}
          faq={faq}
        />
      </div>
      {faq.expand && (
        <Answer
          admin={admin}
          answer={answer}
          onSetFaq={onSetFaq}
          isEditAnswer={isEditAnswer}
          setIsEditAnswer={setIsEditAnswer}
          handleAnswerChange={handleAnswerChange}
        />
      )}
    </div>
  );
};

Faq.displayName = "Faq";

Faq.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    expand: PropTypes.bool
  }),
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  handleEditFAQ: PropTypes.func,
  handleDeleteFAQ: PropTypes.func,
  dragHandleProps: PropTypes.any
};

export default Faq;
