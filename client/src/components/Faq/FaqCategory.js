import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Faq from "./Faq";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  }
});

const FaqCategory = props => {
  const { category, admin, expandFaq, collapseFaq } = props;
  const [categoryEditMode, setCategoryEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category);
  const classes = useStyles();

  const onCategoryChange = e => {
    const name = e.target.value;
    category.name = name;
    setEditedCategory(prevState => ({ ...prevState, name }));
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
        {admin ? (
          <FontAwesomeIcon
            style={{
              cursor: "grab",
              fontSize: "1.5em",
              paddingTop: "0.11em",
              paddingRight: "0em",
              color: "white"
            }}
            icon={faGripHorizontal}
          />
        ) : null}
      </div>

      {category.faqs.map(faq => {
        return (
          <Faq
            faq={faq}
            key={JSON.stringify(faq)}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
        );
      })}
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
  attributes: PropTypes.any,
  listeners: PropTypes.any,
  setActivatorNodeRef: PropTypes.any
};

export default FaqCategory;
