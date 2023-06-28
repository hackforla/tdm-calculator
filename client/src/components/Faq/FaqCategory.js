import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Faq from "./Faq";
import {
  faGripHorizontal,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Droppable, Draggable } from "react-beautiful-dnd";
import Quill from "../Quill";

const useStyles = createUseStyles({
  categoryContainer: {
    minWidth: "60vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f2940",
    color: "white",
    padding: ".4em",
    marginBottom: "0.6em",
    gridColumn: "h-end",
    paddingRight: "0.5em",
    height: "20px"
  },
  addQuestionButton: {
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

const FaqCategory = props => {
  const {
    category,
    admin,
    expandFaq,
    collapseFaq,
    dragHandleProps,
    handleAddFAQ,
    handleEditFAQ,
    handleEditCategory,
    handleDeleteFAQ,
    handleDeleteCategory
  } = props;
  const classes = useStyles();
  const [categoryEditMode, setCategoryEditMode] = useState(!category.name);
  const [categoryName, setCategoryName] = useState(category.name);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isNewFAQOpen, setIsNewFAQOpen] = useState(false);

  const handleCategoryNameChange = e => {
    setCategoryName(e.target.value);
    handleEditCategory(category, e.target.value);
  };

  const onEditFAQ = (faqId, question, answer) => {
    handleEditFAQ(category.id, faqId, question, answer);
  };

  const onDeleteFAQ = faqId => {
    handleDeleteFAQ(category.id, faqId);
  };

  const onDeleteCategory = () => {
    handleDeleteCategory(category.id);
  };

  const handleNewQuestionChange = e => {
    setNewQuestion(e.target.value);
  };

  const handleNewAnswerChange = ans => {
    setNewAnswer(ans);
  };

  const handleOpenNewFAQ = () => {
    setIsNewFAQOpen(true);
  };

  const handleCloseNewFAQ = () => {
    setIsNewFAQOpen(false);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleSaveNewFAQ = () => {
    handleAddFAQ(category, newQuestion, newAnswer);
    handleCloseNewFAQ();
  };

  return (
    <div>
      <div className={classes.categoryContainer}>
        {categoryEditMode ? (
          <div>
            <input
              placeholder="Category Name..."
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
              value={categoryName}
              name="name"
              onChange={handleCategoryNameChange}
              onBlur={() => {
                setCategoryEditMode(false);
              }}
              autoFocus
            />
          </div>
        ) : (
          <h3
            dangerouslySetInnerHTML={{ __html: `${categoryName}` }}
            style={{
              fontWeight: "bold",
              marginTop: "0.5em"
            }}
            onClick={() => {
              setCategoryEditMode(true);
            }}
          ></h3>
        )}
        <div {...dragHandleProps}>
          {admin ? (
            <>
              <FontAwesomeIcon
                style={{
                  cursor: "grab",
                  fontSize: "1.5em",
                  paddingTop: "0.11em",
                  paddingRight: "0em",
                  color: "lightgray"
                }}
                icon={faGripHorizontal}
              />
              <FontAwesomeIcon
                style={{
                  cursor: "pointer",
                  fontSize: "1.5em",
                  paddingTop: "0.11em",
                  paddingLeft: "0.25em",
                  color: "lightgray"
                }}
                icon={faTrashAlt}
                onClick={onDeleteCategory}
              />
            </>
          ) : null}
        </div>
      </div>
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
                <Draggable
                  key={faq.id}
                  draggableId={"f" + faq.id}
                  index={index}
                >
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
            {isNewFAQOpen && (
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
                <button onClick={handleSaveNewFAQ}>Save New FAQ</button>
                <button onClick={handleCloseNewFAQ}>Cancel</button>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {admin ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className={classes.addQuestionButton}
            onClick={handleOpenNewFAQ}
          >
            Add new question
          </button>
        </div>
      ) : null}
    </div>
  );
};

FaqCategory.displayName = "FaqCategory";

FaqCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    displayOrder: PropTypes.number.isRequired,
    faqs: PropTypes.array
  }),
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
  deleteFaq: PropTypes.func,
  dragHandleProps: PropTypes.func,
  handleAddFAQ: PropTypes.func,
  handleEditFAQ: PropTypes.func,
  handleDeleteFAQ: PropTypes.func,
  handleDeleteCategory: PropTypes.func
};

export default FaqCategory;
