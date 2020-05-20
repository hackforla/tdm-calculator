import React, { useState } from "react";
import * as faqService from "../../services/faq.service";

const FaqAdd = () => {
  const [toggle, setToggle] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: ""
  });

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onInputTyping = event => {
    setNewFaq({ ...newFaq, [event.target.name]: event.target.value });
  };

  const onSubmitFaq = event => {
    event.preventDefault();
    faqService.post(newFaq).catch(error => {
      console.error(JSON.stringify(error, null, 2));
    });

    setToggle(!toggle);
    setNewFaq({ question: "", answer: "" });
  };

  return (
    <>
      {toggle ? (
        <form onSubmit={onSubmitFaq}>
          <input
            placeholder="New Question..."
            type="text"
            value={newFaq.question}
            name="question"
            onChange={onInputTyping}
          />
          <input
            placeholder="New Answer..."
            type="text"
            value={newFaq.answer}
            name="answer"
            onChange={onInputTyping}
          />
          <button onClick={onSubmitFaq}>Submit New FAQ</button>
          <button onClick={onToggle}>Cancel</button>
        </form>
      ) : (
        <button onClick={onToggle}>Add a new FAQ</button>
      )}
    </>
  );
};

export default FaqAdd;
