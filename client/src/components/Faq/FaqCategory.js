// import React, { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Faq from "./Faq";
// import * as faqCategoryService from "../../services/faqCategory.service";

// want to make this component re-useable, so will check if admin
// if admin, add/update/delete buttons show up
// if not, only question and answer show up

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
    paddingRight: "40px",
    height: "20px"
  }
});

const FaqCategory = props => {
  const { category, admin, expandFaq, collapseFaq } = props;

  const classes = useStyles();
  // const [updateCategory, setUpdateCategory] = useState(category);
  // const [toggleUpdate, setToggleUpdate] = useState(false);

  // const onInputTyping = event => {
  //   setUpdateCategory({
  //     ...updateCategory,
  //     [event.target.name]: event.target.value
  //   });
  // };

  // const onToggle = () => {
  //   setToggleUpdate(!toggleUpdate);
  // };

  // const onUpdate = () => {
  //   faqCategoryService
  //     .put(updateCategory)
  //     .then(() => {
  //       setToggleUpdate(!toggleUpdate);
  //     })
  //     .catch(error => {
  //       console.error(JSON.stringify(error, null, 2));
  //     });
  // };

  // const onDelete = () => {
  //   faqCategoryService.del(category.id).catch(error => {
  //     console.error(JSON.stringify(error, null, 2));
  //   });
  // };

  return (
    <div>
      <h3 className={classes.categoryContainer}>{category.name}</h3>
      {category.faqs.map(faq => {
        return (
          <Faq
            faq={faq}
            key={faq.id}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
        );
      })}
      {/* {admin ? (
        <div classes={classes.faqContent}>
          {toggleUpdate ? (
            <div>
              <input
                placeholder="Question..."
                type="text"
                value={updateCategory.question}
                name="question"
                onChange={onInputTyping}
              />
              <input
                placeholder="Answer..."
                type="text"
                value={updateCategory.answer}
                name="answer"
                onChange={onInputTyping}
              />
              <div>
                <button onClick={onUpdate}>Update</button>
                <button onClick={onToggle}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p>{updateCategory.question}</p>
              <p>{updateCategory.answer}</p>
              <div>
                <button onClick={onToggle}>Update</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>{category}</div>
        </div>
      )} */}
    </div>
  );
};
FaqCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    displayOrder: PropTypes.number.isRequired,
    faqs: PropTypes.array
  }),
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired
};

export default FaqCategory;
