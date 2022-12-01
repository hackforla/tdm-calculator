import React from "react";
import PropTypes from "prop-types";
import FaqCategory from "./FaqCategory";

const FaqList = props => {
  const { faqList, admin, expandFaq, collapseFaq, faqCategoryList } = props;

  console.log(faqList);

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

  // return (
  //   <div>
  //     {faqCategoryList.map(category => (
  //       <FaqCategory category={category} key={category.id} admin={admin} />
  //     ))}
  //     {faqList.map(faq => (
  //       <Faq
  //         faq={faq}
  //         key={faq.question}
  //         admin={admin}
  //         expandFaq={expandFaq}
  //         collapseFaq={collapseFaq}
  //       />
  //     ))}
  //   </div>
  // );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  faqList: PropTypes.array.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  faqCategoryList: PropTypes.array.isRequired
};

export default FaqList;
