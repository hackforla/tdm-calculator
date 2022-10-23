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
  expandCollapseFlexContainer: {
    gridColumn: "h-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  faqPlusMinusIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const Faq = ({ faq, admin }) => {
  const classes = useStyles();
  const [updateFaq, setUpdateFaq] = useState(faq);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleExpand, setToggleExpand] = useState(false);

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
    <article classes={classes.faqContent}>
      {admin ? (
        <div>
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
          <p>{faq.question}</p>
          <div className={classes.expandCollapseFlexContainer}>
            {toggleExpand ? (
              <FontAwesomeIcon
                className={classes.faqExpandIcon}
                icon={faMinus}
                onClick={() => setToggleExpand(!toggleExpand)}
              />
            ) : (
              <FontAwesomeIcon
                className={classes.faqExpandIcon}
                icon={faPlus}
                onClick={() => setToggleExpand(!toggleExpand)}
              />
            )}
          </div>
          {toggleExpand && <p>{faq.answer}</p>}
        </div>
      )}
    </article>
  );
};
Faq.propTypes = {
  faq: PropTypes.shape({
    faqId: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }),
  admin: PropTypes.bool.isRequired
};

export default Faq;
