import React from "react";
// import { useState } from "react";
import PropTypes from "prop-types";
import SortableFaqCategory from "./SortableFaqCategory";
import FaqCategory from "./FaqCategory";

// import {
//   // closestCenter,
//   DndContext,
//   DragOverlay,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy
// } from "@dnd-kit/sortable";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const FaqList = props => {
  // const [activeId, setActiveId] = useState(null);
  const {
    faqCategoryList,
    admin,
    expandFaq,
    collapseFaq
    // moveCategory,
    // moveFaq
  } = props;

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates
  //   })
  // );

  // function handleDragEnd(event) {
  //   const { active, over } = event;
  //   if (active.id.startsWith("category")) {
  //     // active node starts with category, need to find
  //     // category under the over node
  //     if (over.id.startsWith("category")) {
  //       moveCategory(active.id, over.id);
  //     } else {
  //       // over is a faq, need to find its parent
  //       // category
  //       const parentCategory = faqCategoryList.find(c =>
  //         c.faqs.find(f => `faq${f.id}` === over.id)
  //       );
  //       moveCategory(active.id, `category${parentCategory.id}`);
  //     }
  //   } else {
  //     // active node is a faq
  //     moveFaq(active.id, over.id);
  //   }
  //   setActiveId(null);
  // }

  // function handleDragStart(event) {
  //   const { active } = event;
  //   setActiveId(active.id);
  // }

  return (
    <div>
      {/* <DndContext
        sensors={sensors}
        // collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={faqCategoryList}
          strategy={verticalListSortingStrategy}
        > */}
      <div>
        {faqCategoryList.map(category => (
          <SortableFaqCategory
            key={category.id}
            category={category}
            id={`category${category.id}`}
          >
            <FaqCategory
              category={category}
              admin={admin}
              expandFaq={expandFaq}
              collapseFaq={collapseFaq}
            />
          </SortableFaqCategory>
        ))}
      </div>
      {/* </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div style={{ height: "0.2rem", backgroundColor: "#0f2940" }} />
          ) : null}
        </DragOverlay>
      </DndContext> */}
    </div>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  faqCategoryList: PropTypes.array.isRequired,
  moveCategory: PropTypes.func,
  moveFaq: PropTypes.func
};

export default FaqList;
