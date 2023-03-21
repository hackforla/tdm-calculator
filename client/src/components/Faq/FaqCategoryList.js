import React from "react";
import PropTypes from "prop-types";
import FaqCategory from "./FaqCategory";

import { Droppable, Draggable } from "react-beautiful-dnd";

const FaqCategoryList = props => {
  const { faqCategoryList, admin, expandFaq, collapseFaq } = props;

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
  moveCategory: PropTypes.func,
  moveFaq: PropTypes.func
};

export default FaqCategoryList;
