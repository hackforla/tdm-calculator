import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import * as faqCategoryService from "../../services/faqCategory.service";

// want to make this component re-useable, so will check if admin
// if admin, add/update/delete buttons show up
// if not, only question and answer show up

const useStyles = createUseStyles({
  // collapseFlexContainer: {
  //   gridColumn: "h-end",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingRight: "40px",
  //   height: "70px",
  //   borderBottom: "2px solid #cacaca"
  // },
  // expandFlexContainer: {
  //   gridColumn: "h-end",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingLeft: "10px",
  //   paddingRight: "40px",
  //   marginTop: "20px",
  //   height: "70px",
  //   border: "3px solid #a6c439"
  // }
});

const FaqCategory = props => {
  const { category, admin } = props;
  const classes = useStyles();
  const [updateCategory, setUpdateCategory] = useState(category);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const onInputTyping = event => {
    setUpdateCategory({
      ...updateCategory,
      [event.target.name]: event.target.value
    });
  };

  const onToggle = () => {
    setToggleUpdate(!toggleUpdate);
  };

  const onUpdate = () => {
    faqCategoryService
      .put(updateCategory)
      .then(() => {
        setToggleUpdate(!toggleUpdate);
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2));
      });
  };

  const onDelete = () => {
    faqCategoryService.del(category.id).catch(error => {
      console.error(JSON.stringify(error, null, 2));
    });
  };

  return (
    <div>
      {admin ? (
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
          {/* <div
            className={
              category.expand
                ? classes.expandFlexContainer
                : classes.collapseFlexContainer
            }
          ></div> */}
        </div>
      )}
    </div>
  );
};
FaqCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    displayOrder: PropTypes.number.isRequired
  }),
  admin: PropTypes.bool.isRequired
};

export default FaqCategory;
