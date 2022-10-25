import React from "react";
import PropTypes from "prop-types";
import Faq from "./Faq";

const FaqList = ({ faqList, admin, expandCollapseAllAcordions }) => {
  return (
    <div>
      {faqList.map(faq => (
        <Faq
          faq={faq}
          key={faq.question}
          admin={admin}
          expandCollapseAllAcordions={expandCollapseAllAcordions}
        />
      ))}
    </div>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  faqList: PropTypes.array.isRequired,
  expandCollapseAllAcordions: PropTypes.bool.isRequired
};

export default FaqList;
