import React from "react";
import PropTypes from "prop-types";
import FaqCategory from "./FaqCategory";

import { Droppable, Draggable } from "react-beautiful-dnd";

const FaqCategoryList = props => {
  const {
    admin,
    expandFaq,
    collapseFaq,
    faqCategoryList,
    handleDeleteCategory,
    handleAddFAQ,
    handleEditFAQ,
    handleEditCategory,
    handleDeleteFAQ
  } = props;

  return (
    <Droppable droppableId="a" type="category">
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {faqCategoryList.map((category, index) => {
            return (
              <Draggable
                key={category.id}
                draggableId={"c" + category.id}
                index={index}
              >
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <FaqCategory
                      key={category.id}
                      category={category}
                      admin={admin}
                      expandFaq={expandFaq}
                      collapseFaq={collapseFaq}
                      handleAddFAQ={handleAddFAQ}
                      handleEditFAQ={handleEditFAQ}
                      handleEditCategory={handleEditCategory}
                      handleDeleteFAQ={handleDeleteFAQ}
                      handleDeleteCategory={handleDeleteCategory}
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
  );
};

FaqCategoryList.propTypes = {
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  faqCategoryList: PropTypes.array.isRequired,
  handleEditFAQ: PropTypes.func,
  handleAddFAQ: PropTypes.func,
  handleDeleteCategory: PropTypes.func,
  handleDeleteFAQ: PropTypes.func,
  handleEditCategory: PropTypes.func
};

export default FaqCategoryList;
