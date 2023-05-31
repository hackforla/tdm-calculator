import React from "react";
import PropTypes from "prop-types";
import useFaqViewLogic from "./hooks/useFaqViewLogic";
import FaqCategoryList from "./FaqCategoryList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import EditToggleButton from "../Button/EditToggleButton";
import ContentContainer from "../Layout/ContentContainer";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

const FaqView = props => {
  const {
    admin,
    faqCategoryList,
    expandFaq,
    collapseFaq,
    handleAdminChange,
    handleDragEnd,
    handleDeleteCategory,
    handleDeleteFaq,
    handleSetCategories,
    expanded,
    toggleExpandCollapse
  } = useFaqViewLogic(
    props.toggleChecklistModal,
    props.checklistModalOpen,
    props.match
  );

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
        {admin ? <FaqAdd /> : null}
        <DragDropContext onDragEnd={handleDragEnd}>
          <FaqCategoryList
            faqCategoryList={faqCategoryList}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
            setFaqCategoryList={handleSetCategories}
            deleteCategory={handleDeleteCategory}
            deleteFaq={handleDeleteFaq}
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
