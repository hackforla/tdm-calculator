import React, { useState, useEffect } from "react";
import * as faqService from "../../services/faq.service";
import FaqList from "./FaqList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import ContentContainer from "../Layout/ContentContainer";

const FaqView = () => {
  const [faqList, setFaqList] = useState([]);
  // currently set to true for testing
  // const [admin, setAdmin] = useState(true);
  const admin = false;

  useEffect(() => {
    faqService
      .get()
      .then(response => {
        setFaqList(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2));
      });
    // check if admin
  }, []);

  return (
    <ContentContainer componentToTrack="FaqPage">
      <div
        style={{ width: "1000px", paddingRight: "40px", maxWidth: "1000px" }}
      >
        <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
        <ExpandButtons />
        {admin ? <FaqAdd /> : null}
        <FaqList faqList={faqList} admin={admin} />
      </div>
    </ContentContainer>
  );
};

export default FaqView;
