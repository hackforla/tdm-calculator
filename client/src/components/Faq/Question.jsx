import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const useStyles = createUseStyles(() => ({
  questionAnchor: {
    fontWeight: "bold",
    marginLeft: "0.5em",
    marginRight: "0.25em",
    flex: "0 0 auto",
    paddingTop: "0.65em"
  },
  questionContainer: {
    display: "flex",
    marginTop: 0,
    width: "100%"
  },
  questionText: {
    fontWeight: "bold",
    marginTop: "0.5em",
    cursor: admin => (admin ? "pointer" : "default")
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
  setIsEditQuestion
}) => {
  const classes = useStyles(admin);
  return (
    <div className={classes.questionContainer}>
      <div className={classes.questionAnchor}>{`Q: `}</div>
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
        <h3
          dangerouslySetInnerHTML={{ __html: `${question}` }}
          className={classes.questionText}
          onClick={() => {
            admin && setIsEditQuestion(!isEditQuestion);
          }}
        />
      )}
    </div>
  );
};

Question.propTypes = {
  admin: PropTypes.boolean,
  question: PropTypes.string,
  isEditQuestion: PropTypes.bool,
  handleQuestionChange: PropTypes.func,
  onSetFaq: PropTypes.func,
  setIsEditQuestion: PropTypes.func
};
