import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

import Quill from "../Quill";

const useStyles = createUseStyles({
  collapseFlexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
    minHeight: "2em"
  },
  expandFlexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
    minHeight: "2em",
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = e => {
    setAnswer(e.target.value);
  };

  const handleSaveFAQ = () => {
    handleEditFAQ(faq.id, question, answer);
  };

  const onDeleteFAQ = () => {
    handleDeleteFAQ(faq.id);
  };

  return (
    <div>
      <div
        className={
          faq.expand
            ? classes.expandFlexContainer
            : classes.collapseFlexContainer
        }
      >
        <div
          style={{
            fontWeight: "bold",
            marginLeft: "0.5em",
            marginRight: "0.25em",
            flex: "0 0 auto",
            paddingTop: "0.65em"
          }}
        >
          {`Q: `}
        </div>
        <div
          style={{
            flex: "1 1 0",
            marginTop: 0
          }}
        >
          {isEditMode ? (
            <div>
              <input
                placeholder="Question..."
                autoFocus
                type="text"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.15em",
                  marginLeft: 0,
                  marginTop: 0,
                  display: "block",
                  marginRight: "2em",
                  padding: "0.3em 0"
                }}
                value={question}
                name="question"
                onChange={handleQuestionChange}
              />
            </div>
          ) : (
            <h3
              dangerouslySetInnerHTML={{ __html: `${question}` }}
              style={{
                fontWeight: "bold",
                marginTop: "0.5em"
              }}
              onClick={() => {
                setIsEditMode(true);
              }}
            ></h3>
          )}
        </div>
        <div className={classes.faqExpandIcon}>
          {faq.expand ? (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faChevronUp}
              onClick={() => collapseFaq(faq)}
            />
          ) : (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faChevronDown}
              onClick={() => expandFaq(faq)}
            />
          )}
        </div>
        <div {...dragHandleProps}>
          {admin ? (
            <>
              <FontAwesomeIcon
                style={{
                  cursor: "grab",
                  fontSize: "1.5em",
                  paddingTop: "0.25em",
                  paddingRight: "0.25em"
                }}
                icon={faGripHorizontal}
              />
              <FontAwesomeIcon
                style={{
                  cursor: "pointer",
                  fontSize: "1.5em",
                  paddingTop: "0.25em",
                  paddingRight: "0.25em"
                }}
                icon={faTrashAlt}
                onClick={onDeleteFAQ}
              />
            </>
          ) : null}
        </div>
      </div>
      {faq.expand ? (
        isEditMode ? (
          <div style={{ display: "flex", width: "100%" }}>
            <div
              style={{
                fontWeight: "bold",
                marginLeft: "0.5em",
                marginRight: "0.25em",
                flex: "0 0 auto",
                paddingTop: "0.65em"
              }}
            >
              {`A: `}
            </div>
            <Quill
              value={answer}
              onChange={handleAnswerChange}
              onBlur={() => {
                setIsEditMode(false);
                handleSaveFAQ();
              }}
              style={{ flex: "1 0 100%" }}
            />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontWeight: "bold",
                marginLeft: "0.7em",
                marginRight: "0.25em",
                flex: "0 0 auto",
                paddingTop: "0.65em"
              }}
            >
              {`A: `}
            </div>
            <p
              style={{ marginTop: "0.5em", fontWeight: "bold" }}
              dangerouslySetInnerHTML={{ __html: `${answer}` }}
              onClick={() => setIsEditMode(true)}
            ></p>
          </div>
        )
      ) : (
        ""
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
    expand: PropTypes.bool.isRequired
  }),
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  handleEditFAQ: PropTypes.func,
  handleDeleteFAQ: PropTypes.func,
  dragHandleProps: PropTypes.any
};

export default Faq;
