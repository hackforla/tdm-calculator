import React, { useState, useEffect } from "react";
import * as faqService from "../services/faq.service";
import FaqList from "./FaqList";

const FaqView = () => {
  const [faqList, setFaqList] = useState([]);
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
  }, []);
  return (
    <div>
      <h4>Add/Update/Delete Frequently Asked Questions</h4>
      {admin ? <button>Add a new FAQ</button> : null}
      <FaqList faqList={faqList} admin={admin} />
    </div>
  );
};

export default FaqView;
