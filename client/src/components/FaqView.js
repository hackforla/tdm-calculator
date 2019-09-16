import React, { useState, useEffect } from "react";
import * as faqService from "../services/faq.service";
import FaqList from "./FaqList";
import FaqAdd from './FaqAdd'

const FaqView = () => {
  const [faqList, setFaqList] = useState([]);
  // currently set to true for testing
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    faqService
      .get()
      .then(response => {
        setFaqList(response.data);
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
      });

    // check if admin
  }, [(<FaqAdd />)]);

  

  return (
    <div>
      <h4>Add/Update/Delete Frequently Asked Questions</h4>
      {admin ? <FaqAdd /> : null}
      <FaqList faqList={faqList} admin={admin} />
    </div>
  );
};

export default FaqView;
