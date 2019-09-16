import React from "react";
import Faq from "./Faq";

const FaqList = ({ faqList, admin }) => {
  return (
    <ul>
      {faqList.map(faq => (
        <Faq faq={faq} key={faq.question} admin={admin}/>
      ))}
    </ul>
  );
};

export default FaqList;
