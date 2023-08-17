import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Faq from "./Faq";
import PropTypes from "prop-types";
import { NewFaqContainer } from "./NewFaqContainer";

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
            <NewFaqContainer
              newQuestion={newQuestion}
              newAnswer={newAnswer}
              handleNewQuestionChange={handleNewQuestionChange}
              handleNewAnswerChange={handleNewAnswerChange}
              handleSaveNewFAQ={handleSaveNewFAQ}
              handleCloseNewFAQ={handleCloseNewFAQ}
            />
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
