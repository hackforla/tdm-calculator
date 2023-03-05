import React from "react";
// import { useState } from "react";
import PropTypes from "prop-types";
import FaqCategory from "./FaqCategory";

const FaqCategoryList = props => {
  const {
    faqCategoryList,
    admin,
    expandFaq,
    collapseFaq
    // moveCategory,
    // moveFaq
  } = props;

  return (
    <div>
      <div>
        {faqCategoryList.map(category => (
          <FaqCategory
            key={category.id}
            category={category}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
        ))}
      </div>
    </div>
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
