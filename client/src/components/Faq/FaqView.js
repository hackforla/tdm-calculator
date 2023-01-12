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
    async function fetch() {
      const faqList = await faqService.get();
      const faqs = faqList.data.map(faq => {
        return { ...faq, expand: false };
      });

      const faqCategoryList = await faqCategoryService.get();
      const categories = faqCategoryList.data;

      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < faqs.length; j++) {
          if (categories[i].id === faqs[j].faqCategoryId) {
            if (categories[i].faqs) {
              categories[i].faqs.push(faqs[j]);
            } else {
              categories[i].faqs = [faqs[j]];
            }
          }
        }
      }
      setFaqList(faqs);
      setFaqCategoryList(categories);
    }
    fetch();
    // check if admin
  }, []);

  const expandFaq = faq => {
    setFaqList(
      faqList.map(item => {
        if (faq.id === item.id) {
          return { ...item, expand: true };
        } else {
          return item;
        }
      })
    );
  };

  const collapseFaq = faq => {
    setFaqCategoryList(
      faqCategoryList.map(item => {
        if (faq.question === item.faqs[faq].question) {
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
