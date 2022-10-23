import React from "react";
import PropTypes from "prop-types";
import Faq from "./Faq";

const FaqList = ({ faqList, admin }) => {
  return (
    <div>
      {faqList.map(faq => (
        <Faq faq={faq} key={faq.question} admin={admin} />
      ))}
    </div>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  faqList: PropTypes.array.isRequired
};

export default FaqList;
