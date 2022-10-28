import React from "react";
import PropTypes from "prop-types";
import Faq from "./Faq";

const FaqList = props => {
  const { faqList, admin, expandFaq, collapseFaq } = props;
  return (
    <div>
      {faqList.map(faq => (
        <Faq
          faq={faq}
          key={faq.question}
          admin={admin}
          expandFaq={expandFaq}
          collapseFaq={collapseFaq}
        />
      ))}
    </div>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  faqList: PropTypes.array.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired
};

export default FaqList;
