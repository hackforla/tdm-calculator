import React, { useState, useEffect } from "react";
import * as faqService from "../../services/faq.service";
import FaqList from "./FaqList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import ContentContainer from "../Layout/ContentContainer";

const FaqView = () => {
  const [faqList, setFaqList] = useState([]);
  const [expandAllAcordions, setExpandAllAcordions] = useState(false);
  const [collapseAllAcordions, setCollapseAllAcordions] = useState(false);

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

  const expandAll = () => {
    setExpandAllAcordions(true);
    console.log("expand");
  };

  const collapseAll = () => {
    setCollapseAllAcordions(true);
    console.log("collapse");
  };

  return (
    <ContentContainer componentToTrack="FaqPage">
      <div style={{ width: "-webkit-fill-available" }}>
        <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
        <ExpandButtons expandAll={expandAll} collapseAll={collapseAll} />
        {admin ? <FaqAdd /> : null}
        <FaqList
          faqList={faqList}
          admin={admin}
          expandAllAcordions={expandAllAcordions}
          collapseAllAcordions={collapseAllAcordions}
        />
      </div>
    </ContentContainer>
  );
};

export default FaqView;
