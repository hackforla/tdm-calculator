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
    // TODO: the early returns look like hackery.
    // not sure what it's trying to do, but handleSetFAQ is called on blur,
    // which means it's called when opening links in a new tab.
    // this is a problem because,
    // we really don't need to call it all the time (thus the hackery).

    // Check if the relatedTarget is within the Answer component
    const tooltip = document.getElementsByClassName("ql-tooltip");
    if (
      tooltip &&
      tooltip.length > 1 &&
      !tooltip[0].className.includes("hidden")
    ) {
      return;
    }
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
