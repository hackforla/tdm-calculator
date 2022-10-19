import React, { useState, useEffect } from "react";
import * as faqService from "../../services/faq.service";
import Faq from "./Faq";
import FaqList from "./FaqList";
// import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";

const FaqView = () => {
  const [faqList, setFaqList] = useState([]);
  // currently set to true for testing
  //const [admin, setAdmin] = useState(true);
  const admin = true;

  useEffect(() => {
    faqService
      .get()
      .then(response => {
        setFaqList(response.data);
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2));
      });

    // check if admin
  }, []);

  return (
    <div>
      <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
      <ExpandButtons />
      <Faq />
      {/* {admin ? <FaqAdd /> : null} */}
      <FaqList faqList={faqList} admin={admin} />
    </div>
  );
};

export default FaqView;
