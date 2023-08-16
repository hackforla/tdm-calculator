import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Quill from "../Quill";
import Faq from "./Faq";
import PropTypes from "prop-types";

export const FaqList = ({
  category,
  admin,
  expandFaq,
  collapseFaq,
  onDeleteFAQ,
  onEditFAQ,
  isNewFAQOpen,
  newQuestion,
  newAnswer,
  handleNewQuestionChange,
  handleNewAnswerChange,
  handleSaveNewFAQ,
  handleCloseNewFAQ
}) => {
  return (
    <Droppable droppableId={"c" + category.id} type="faq">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            minHeight: "3rem"
          }}
        >
          {category.faqs.map((faq, index) => {
            return (
              <Draggable key={faq.id} draggableId={"f" + faq.id} index={index}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <Faq
                      faq={faq}
                      admin={admin}
                      expandFaq={expandFaq}
                      collapseFaq={collapseFaq}
                      handleDeleteFAQ={onDeleteFAQ}
                      handleEditFAQ={onEditFAQ}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {admin && isNewFAQOpen && (
            <div>
              <input
                type="text"
                placeholder="Enter a new question..."
                value={newQuestion}
                onChange={handleNewQuestionChange}
              />
              <Quill
                type="text"
                placeholder="Enter a new answer..."
                value={newAnswer}
                onChange={handleNewAnswerChange}
              />
              <button
                disabled={!newQuestion || !newAnswer}
                onClick={handleSaveNewFAQ}
              >
                Save New FAQ
              </button>
              <button onClick={handleCloseNewFAQ}>Cancel</button>
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

FaqList.propTypes = {
  category: PropTypes.object,
  admin: PropTypes.bool,
  expandFaq: PropTypes.func,
  collapseFaq: PropTypes.func,
  onDeleteFAQ: PropTypes.func,
  onEditFAQ: PropTypes.func,
  isNewFAQOpen: PropTypes.func,
  newQuestion: PropTypes.string,
  newAnswer: PropTypes.string,
  handleNewQuestionChange: PropTypes.func,
  handleNewAnswerChange: PropTypes.func,
  handleSaveNewFAQ: PropTypes.func,
  handleCloseNewFAQ: PropTypes.func
};
