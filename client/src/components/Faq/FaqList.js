import React from "react";
import PropTypes from "prop-types";
import Faq from "./Faq";

const FaqList = ({ faqList, admin }) => {
  return (
    <ul>
      {faqList.map(faq => (
        <Faq faq={faq} key={faq.question} admin={admin} />
      ))}
    </ul>
  );
};
FaqList.propTypes = {
  admin: PropTypes.bool.isRequired,
  faqList: PropTypes.array.isRequired
};

export default FaqList;
