import React from "react";
import PropTypes from "prop-types";
import FaqCategory from "./FaqCategory";

const FaqList = props => {
  const { faqCategoryList, admin, expandFaq, collapseFaq } = props;
  console.log(faqCategoryList);
  return (
    <div>
      {faqCategoryList.map(category => (
        <>
          <FaqCategory
            category={category}
            key={category.id}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
        </>
      ))}
    </div>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  faqCategoryList: PropTypes.array.isRequired
};

export default FaqList;
