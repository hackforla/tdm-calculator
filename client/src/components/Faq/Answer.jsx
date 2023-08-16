import React from "react";
import Quill from "../Quill";
// import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

// const useStyles = createUseStyles({
//   answerAnchor: {
//     fontWeight: "bold",
//     marginLeft: "0.5em",
//     marginRight: "0.25em",
//     flex: "0 0 auto",
//     paddingTop: "0.65em"
//   },
//   answerContainer: {},
//   answerText: {},
//   answerInput: {}
// });

export const Answer = ({
  admin,
  answer,
  handleAnswerChange,
  isEditAnswer,
  setIsEditAnswer,
  onSetFaq
}) => {
  // const classes = useStyles();
  return (
    <div>
      {isEditAnswer ? (
        <div onBlur={onSetFaq} style={{ display: "flex", width: "100%" }}>
          <Quill
            value={answer}
            onChange={handleAnswerChange}
            style={{ flex: "1 0 100%" }}
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
          ></p>
          {/* <Quill
              value={answer}
              readOnly
              onClick={() => admin && setIsEditAnswer(true)}
              onChange={handleAnswerChange}
              style={{ flex: "1 0 100%" }}
            /> */}
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
