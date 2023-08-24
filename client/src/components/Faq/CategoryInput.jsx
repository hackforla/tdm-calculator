import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
  categoryInput: {
    fontWeight: "bold",
    fontSize: "1.15em",
    marginLeft: 0,
    marginTop: 0,
    display: "block",
    marginRight: "2em",
    padding: "0.3em 0"
  },
  categoryName: {
    ...theme.typography.heading3,
    color: theme.colors.primary.white
  }
}));

export const CategoryInput = ({
  admin,
  categoryName,
  handleCategoryNameChange,
  categoryEditMode,
  setCategoryEditMode,
  onSetCategory
}) => {
  const classes = useStyles();

  const handleCategoryEdit = useCallback(() => {
    admin && setCategoryEditMode(true);
  }, [admin, setCategoryEditMode]);

  return categoryEditMode ? (
    <div>
      <input
        placeholder="Category Name..."
        type="text"
        className={classes.categoryInput}
        value={categoryName}
        name="name"
        onChange={handleCategoryNameChange}
        onBlur={() => {
          onSetCategory();
        }}
        autoFocus
        disabled={!admin}
      />
    </div>
  ) : (
    <div
      className={classes.categoryName}
      dangerouslySetInnerHTML={{ __html: `${categoryName}` }}
      onClick={handleCategoryEdit}
    ></div>
  );
};

CategoryInput.propTypes = {
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
