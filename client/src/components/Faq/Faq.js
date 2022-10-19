import React, { useState } from "react";
import PropTypes from "prop-types";
import * as faqService from "../../services/faq.service";

// want to make this component re-useable, so will check if admin
// if admin, add/update/delete buttons show up
// if not, only question and answer show up
const Faq = ({ faq, admin }) => {
  const [updateFaq, setUpdateFaq] = useState(faq);
  const [toggleUpdate, setToggleUpdate] = useState(false);

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
    <li>
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
          {/* <p>{faq.question}</p>
          <p>{faq.answer}</p> */}
        </div>
      )}
    </li>
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
