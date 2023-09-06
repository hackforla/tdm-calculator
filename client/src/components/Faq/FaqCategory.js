import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { NewFaqButton } from "./NewFaqButton";
import { FaqList } from "./FaqList";
import { CategoryInputContainer } from "./CategoryInputContainer";

const useStyles = createUseStyles({
  categoryButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
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
  const [isHovered, setIsHovered] = useState(false);

  const handleCategoryNameChange = e => {
    setCategoryName(e.target.value);
  };

  const onSetCategory = () => {
    handleEditCategory(category, categoryName);
    setCategoryEditMode(false);
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

  const showDeleteOption = useCallback(
    (isShowDelete = false) => {
      admin && setIsHovered(isShowDelete);
    },
    [admin]
  );

  return (
    <>
      <div
        onMouseEnter={() => showDeleteOption(true)}
        onMouseLeave={() => showDeleteOption()}
      >
        <CategoryInputContainer
          admin={admin}
          categoryName={categoryName}
          handleCategoryNameChange={handleCategoryNameChange}
          categoryEditMode={categoryEditMode}
          setCategoryEditMode={setCategoryEditMode}
          onSetCategory={onSetCategory}
          dragHandleProps={dragHandleProps}
          onDeleteCategory={onDeleteCategory}
          isHovered={isHovered}
        />
      </div>
      <FaqList
        category={category}
        admin={admin}
        expandFaq={expandFaq}
        collapseFaq={collapseFaq}
        onDeleteFAQ={onDeleteFAQ}
        onEditFAQ={onEditFAQ}
        isNewFAQOpen={isNewFAQOpen}
        newQuestion={newQuestion}
        newAnswer={newAnswer}
        handleNewQuestionChange={handleNewQuestionChange}
        handleNewAnswerChange={handleNewAnswerChange}
        handleSaveNewFAQ={handleSaveNewFAQ}
        handleCloseNewFAQ={handleCloseNewFAQ}
      />
      {admin && (
        <div className={classes.categoryButtonContainer}>
          <NewFaqButton admin={admin} handleOpenNewFAQ={handleOpenNewFAQ} />
        </div>
      )}
    </>
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
