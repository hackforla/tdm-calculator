import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { MdDelete, MdViewModule } from "react-icons/md";
import { CategoryInput } from "./CategoryInput";

const useStyles = createUseStyles({
  categoryInputContainer: {
    minWidth: "60vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f2940",
    color: "white",
    padding: ".4em 0 .4em .4em",
    marginBottom: "0.6em",
    gridColumn: "h-end"
  },
  faqIcon: {
    cursor: "pointer",
    fontSize: "1.5em",
    paddingTop: "0.25em",
    paddingRight: "0.25em"
  },
  faqGripIcon: {
    cursor: "grab",
    fontSize: "1.5em",
    paddingTop: "0.25em",
    paddingRight: "0.25em"
  },
  deleteFaqIcon: {
    paddingRight: "28px"
  }
});

/* eslint-disable no-unused-vars */
export const CategoryInputContainer = ({
  categoryName,
  handleCategoryNameChange,
  categoryEditMode,
  setCategoryEditMode,
  onSetCategory,
  admin,
  isHovered,
  dragHandleProps,
  onDeleteCategory
}) => {
  const classes = useStyles();

  return (
    <div className={classes.categoryInputContainer}>
      <CategoryInput
        categoryName={categoryName}
        handleCategoryNameChange={handleCategoryNameChange}
        categoryEditMode={categoryEditMode}
        setCategoryEditMode={setCategoryEditMode}
        onSetCategory={onSetCategory}
        admin={admin}
      />
      <div {...dragHandleProps}>
        {admin && (
          <>
            {
              <MdDelete
                className={`${classes.faqIcon} ${classes.deleteFaqIcon}`}
                onClick={onDeleteCategory}
              />
            }
            <MdViewModule className={classes.faqGripIcon} />
          </>
        )}
      </div>
    </div>
  );
};

CategoryInputContainer.propTypes = {
  categoryName: PropTypes.string,
  handleCategoryNameChange: PropTypes.func,
  categoryEditMode: PropTypes.bool,
  setCategoryEditMode: PropTypes.func,
  onSetCategory: PropTypes.func,
  isHovered: PropTypes.bool,
  dragHandleProps: PropTypes.object,
  onDeleteCategory: PropTypes.func,
  admin: PropTypes.bool
};
/* eslint-enable no-unused-vars */