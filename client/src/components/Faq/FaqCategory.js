import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Faq from "./Faq";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Droppable, Draggable } from "react-beautiful-dnd";

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
  const { category, admin, expandFaq, collapseFaq, dragHandleProps } = props;
  const [categoryEditMode, setCategoryEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category);
  const classes = useStyles();

  const onCategoryChange = e => {
    const name = e.target.value;
    category.name = name;
    setEditedCategory(prevState => ({ ...prevState, name }));
  };

  const handleAddFaq = () => {
    const categoryId = category.id;
    const newFaq = {
      id: -1000,
      question: "Enter a question",
      answer: "Enter an answer",
      displayOrder: 0,
      faqCategoryId: { categoryId }
    };
    setEditedCategory(prevState => ({
      ...prevState,
      faqs: prevState.faqs.splice(1, 0, newFaq)
    }));
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
              value={editedCategory.name}
              name="name"
              onChange={onCategoryChange}
              onBlur={() => {
                setCategoryEditMode(false);
              }}
              autoFocus
            />
          </div>
        ) : (
          <h3
            dangerouslySetInnerHTML={{ __html: `${category.name}` }}
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
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {admin ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className={classes.addQuestionButton} onClick={handleAddFaq}>
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
  dragHandleProps: PropTypes.any
};

export default FaqCategory;
