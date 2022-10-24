import React from "react";
import PropTypes from "prop-types";
import Faq from "./Faq";

const FaqList = ({
  faqList,
  admin,
  expandAllAcordions,
  collapseAllAcordions
}) => {
  return (
    <div>
      {faqList.map(faq => (
        <Faq
          faq={faq}
          key={faq.question}
          admin={admin}
          expandAllAcordions={expandAllAcordions}
          collapseAllAcordions={collapseAllAcordions}
        />
      ))}
    </div>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  faqList: PropTypes.array.isRequired,
  expandAllAcordions: PropTypes.bool.isRequired,
  collapseAllAcordions: PropTypes.bool.isRequired
};

export default FaqList;
