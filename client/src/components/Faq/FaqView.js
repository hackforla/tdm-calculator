import React, { useState } from "react";
import PropTypes from "prop-types";
import FaqCategoryList from "./FaqCategoryList";
import ExpandButtons from "./ExpandButtons";
import EditToggleButton from "../Button/EditToggleButton";
import ContentContainer from "../Layout/ContentContainer";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import useFaqCategory from "./hooks/useFaqCategory";

const FaqView = () => {
  const [admin, setAdmin] = useState(false);
  const {
    expanded,
    faqCategoryList,
    setFaqCategoryList,
    handleAddCategory,
    handleDeleteCategory,
    handleAddFAQ,
    handleEditFAQ,
    handleEditCategory,
    handleDeleteFAQ,
    expandFaq,
    collapseFaq,
    toggleExpandCollapse,
    submitFaqData
  } = useFaqCategory();

  const handleDragEnd = result => {
    const { type, destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    setFaqCategoryList(prevState => {
      const newState = [...prevState];

      if (type === "faq") {
        const sourceCategoryIndex = prevState.findIndex(
          c => "c" + c.id === result.source.droppableId
        );
        const destinationCategoryIndex = prevState.findIndex(
          c => "c" + c.id === result.destination.droppableId
        );

        const sourceFaqs = [...prevState[sourceCategoryIndex].faqs];
        const [draggedFaq] = sourceFaqs.splice(source.index, 1);

        newState[sourceCategoryIndex] = {
          ...prevState[sourceCategoryIndex],
          faqs: sourceFaqs
        };

        if (destination.droppableId === source.droppableId) {
          const newFaqs = [...sourceFaqs];
          newFaqs.splice(destination.index, 0, draggedFaq);
          newState[sourceCategoryIndex].faqs = newFaqs;
        } else {
          const destinationFaqs = [...prevState[destinationCategoryIndex].faqs];
          destinationFaqs.splice(destination.index, 0, draggedFaq);

          newState[destinationCategoryIndex] = {
            ...prevState[destinationCategoryIndex],
            faqs: destinationFaqs
          };
        }
      } else if (type === "category") {
        const [draggedCategory] = newState.splice(source.index, 1);
        newState.splice(destination.index, 0, draggedCategory);
      }

      return newState;
    });
  };

  const handleAdminChange = () => {
    if (admin) {
      submitFaqData();
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  };

  return (
    <ContentContainer componentToTrack="FaqPage">
      <div style={{ width: "-webkit-fill-available", marginRight: "5%" }}>
        <EditToggleButton
          id="EditToggleButton"
          editMode={admin}
          onClick={handleAdminChange}
        />
        <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
        <ExpandButtons
          expanded={expanded}
          toggleExpandCollapse={toggleExpandCollapse}
        />
        {admin && <button onClick={handleAddCategory}>Add New Category</button>}
        <DragDropContext onDragEnd={handleDragEnd}>
          <FaqCategoryList
            faqCategoryList={faqCategoryList}
            handleDeleteCategory={handleDeleteCategory}
            handleAddFAQ={handleAddFAQ}
            handleEditFAQ={handleEditFAQ}
            handleEditCategory={handleEditCategory}
            handleDeleteFAQ={handleDeleteFAQ}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
        </DragDropContext>
      </div>
    </ContentContainer>
  );
};

FaqView.propTypes = {
  toggleChecklistModal: PropTypes.func,
  checklistModalOpen: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      showChecklist: PropTypes.string
    })
  })
};

export default withRouter(FaqView);
