import React, { useState, useEffect } from "react";
import * as faqService from "../../services/faq.service";
import * as faqCategoryService from "../../services/faqCategory.service";
import FaqList from "./FaqList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import ContentContainer from "../Layout/ContentContainer";

const FaqView = () => {
  const [faqList, setFaqList] = useState([]);
  const [faqCategoryList, setFaqCategoryList] = useState([]);

  // currently set to true for testing
  // const [admin, setAdmin] = useState(true);
  const admin = false;

  useEffect(() => {
    faqService
      .get()
      .then(response => {
        setFaqList(
          response.data.map(faq => {
            console.log("1", faq);
            return { ...faq, expand: false };
          })
        );
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2));
      });
    faqCategoryService
      .get()
      .then(response => {
        setFaqCategoryList(
          response.data.map(category => {
            console.log("2", category);
            return { ...category };
          })
        );
      })

      .catch(error => {
        console.error(JSON.stringify(error, null, 2));
      });
    // check if admin
  }, []);

  const expandFaq = faq => {
    setFaqList(
      faqList.map(item => {
        if (faq.question === item.question) {
          return { ...item, expand: true };
        } else {
          return item;
        }
      })
    );
  };

  const collapseFaq = faq => {
    setFaqList(
      faqList.map(item => {
        if (faq.question === item.question) {
          return { ...item, expand: false };
        } else {
          return item;
        }
      })
    );
  };

  const expandAll = () => {
    setFaqList(
      faqList.map(faq => {
        return { ...faq, expand: true };
      })
    );
  };

  const collapseAll = () => {
    setFaqList(
      faqList.map(faq => {
        return { ...faq, expand: false };
      })
    );
  };

  return (
    <ContentContainer componentToTrack="FaqPage">
      <div style={{ width: "-webkit-fill-available", marginRight: "5%" }}>
        <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
        <ExpandButtons expandAll={expandAll} collapseAll={collapseAll} />
        {admin ? <FaqAdd /> : null}
        <FaqList
          faqList={faqList}
          setFaqList={setFaqList}
          admin={admin}
          expandFaq={expandFaq}
          collapseFaq={collapseFaq}
          faqCategoryList={faqCategoryList}
          setFaqCategoryList={setFaqCategoryList}
        />
      </div>
    </ContentContainer>
  );
};

export default FaqView;
