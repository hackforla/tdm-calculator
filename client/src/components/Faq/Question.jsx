import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const useStyles = createUseStyles(theme => ({
  questionAnchor: {
    fontWeight: "bold",
    marginLeft: "0.5em",
    marginRight: "0.25em",
    flex: "0 0 auto",
    paddingTop: "0.65em"
  },
  questionContainer: {
    display: "flex",
    margin: "0.6em",
    width: "100%"
  },
  questionText: {
    ...theme.typography.heading3,
    textAlign: "inherit",
    fontSize: 22,
    cursor: admin => (admin ? "pointer" : "default"),
    "&:hover": {
      textDecoration: admin => admin && "underline"
    }
  },
  questionInput: {
    fontWeight: "bold",
    fontSize: "1.15em",
    marginLeft: 0,
    marginTop: 0,
    marginRight: "2em",
    padding: "0.3em 0",
    width: "100%"
  }
}));

export const Question = ({
  admin,
  question,
  isEditQuestion,
  handleQuestionChange,
  onSetFaq,
  setIsEditQuestion,
  expandFaq,
  collapseFaq,
  faq
}) => {
  const classes = useStyles(admin);
  const handleClick = () => {
    // when in edit mode, start editing the question
    if (admin) {
      setIsEditQuestion(!isEditQuestion);
    } else {
      if (faq.expand) {
        collapseFaq(faq);
      } else {
        expandFaq(faq);
      }
    }
  };
  return (
    <div className={classes.questionContainer}>
      {isEditQuestion ? (
        <div className={classes.questionInput}>
          <input
            placeholder="Question..."
            autoFocus
            type="text"
            value={question}
            name="question"
            onChange={handleQuestionChange}
            onBlur={onSetFaq}
          />
        </div>
      ) : (
        <div className={classes.questionText} onClick={handleClick}>
          <>{question}</>
        </div>
      )}
    </div>
  );
};

Question.propTypes = {
  admin: PropTypes.bool,
  question: PropTypes.string,
  isEditQuestion: PropTypes.bool,
  handleQuestionChange: PropTypes.func,
  onSetFaq: PropTypes.func,
  setIsEditQuestion: PropTypes.func,
  expandFaq: PropTypes.func,
  collapseFaq: PropTypes.func,
  faq: PropTypes.object
};
