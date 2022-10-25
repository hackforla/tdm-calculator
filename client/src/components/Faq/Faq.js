import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import * as faqService from "../../services/faq.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

// want to make this component re-useable, so will check if admin
// if admin, add/update/delete buttons show up
// if not, only question and answer show up

const useStyles = createUseStyles({
  collapseFlexContainer: {
    gridColumn: "h-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "40px",
    height: "70px",
    borderBottom: "2px solid #cacaca"
  },
  expandFlexContainer: {
    gridColumn: "h-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "10px",
    paddingRight: "40px",
    marginTop: "20px",
    height: "70px",
    border: "3px solid #a6c439"
  },
  faqPlusMinusIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  faqExpandIcon: {
    display: "flex",
    alignItems: "center",
    fontSize: "25px"
  }
});

const Faq = ({ faq, admin, expandCollapseAllAcordions }) => {
  const classes = useStyles();
  const [updateFaq, setUpdateFaq] = useState(faq);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleExpand, setToggleExpand] = useState(false);
  let toggleExpandAll = false;

  if (expandCollapseAllAcordions === true) {
    toggleExpandAll = true;
  } else {
    toggleExpandAll = false;
  }

  const onInputTyping = event => {
    setUpdateFaq({ ...updateFaq, [event.target.name]: event.target.value });
  };

  const onToggle = () => {
    setToggleUpdate(!toggleUpdate);
  };

  const onUpdate = () => {
    faqService
      .put(updateFaq)
      .then(() => {
        setToggleUpdate(!toggleUpdate);
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2));
      });
  };

  const onDelete = () => {
    faqService.del(faq.faqId).catch(error => {
      console.error(JSON.stringify(error, null, 2));
    });
  };

  return (
    <div>
      {admin ? (
        <div classes={classes.faqContent}>
          {toggleUpdate ? (
            <div>
              <input
                placeholder="Question..."
                type="text"
                value={updateFaq.question}
                name="question"
                onChange={onInputTyping}
              />
              <input
                placeholder="Answer..."
                type="text"
                value={updateFaq.answer}
                name="answer"
                onChange={onInputTyping}
              />
              <div>
                <button onClick={onUpdate}>Update</button>
                <button onClick={onToggle}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p>{updateFaq.question}</p>
              <p>{updateFaq.answer}</p>
              <div>
                <button onClick={onToggle}>Update</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div
            className={
              toggleExpand || toggleExpandAll
                ? classes.expandFlexContainer
                : classes.collapseFlexContainer
            }
          >
            <h3>{faq.question}</h3>
            <div className={classes.faqExpandIcon}>
              {toggleExpand || toggleExpandAll ? (
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faMinus}
                  onClick={() => setToggleExpand(!toggleExpand)}
                />
              ) : (
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faPlus}
                  onClick={() => setToggleExpand(!toggleExpand)}
                />
              )}
            </div>
          </div>
          {(toggleExpand || toggleExpandAll) && (
            <p style={{ marginTop: "1em", fontWeight: "bold" }}>{faq.answer}</p>
          )}
        </div>
      )}
    </div>
  );
};
Faq.propTypes = {
  faq: PropTypes.shape({
    faqId: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }),
  admin: PropTypes.bool.isRequired,
  expandCollapseAllAcordions: PropTypes.bool.isRequired
};

export default Faq;
