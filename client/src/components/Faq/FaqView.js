import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as faqService from "../../services/faq.service";
import * as faqCategoryService from "../../services/faqCategory.service";
import FaqList from "./FaqCategoryList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import EditToggleButton from "../Button/EditToggleButton";
import ContentContainer from "../Layout/ContentContainer";
import { withRouter } from "react-router-dom";

const FaqView = props => {
  const [admin, setAdmin] = useState(false);
  const [faqCategoryList, setFaqCategoryList] = useState([]);
  const [faqCategoryListOriginal, setFaqCategoryListOriginal] = useState([]);
  const { match, toggleChecklistModal, checklistModalOpen } = props;
  const [showChecklist, setShowChecklist] = useState(
    match.params.showChecklist || false
  );

  // This effect is a roundabout way of allowing an FAQ question or answer in HTML
  // to open the checklist dialog by navigating to the path /faqs/true.
  useEffect(() => {
    if (showChecklist && !checklistModalOpen) {
      toggleChecklistModal();
      setShowChecklist(false);
    }
  }, [
    showChecklist,
    setShowChecklist,
    checklistModalOpen,
    toggleChecklistModal
  ]);

  useEffect(() => {
    async function fetch() {
      const faqList = await faqService.get();
      const faqs = faqList.data.map(faq => {
        return { ...faq, expand: false };
      });

      const faqCategoryList = await faqCategoryService.get();
      const categories = faqCategoryList.data;

      // Put each faq into the faqs array property
      // of the correct category
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
      setFaqCategoryList(categories);
      // Make a deep copy of the original data, so we can use it to
      // alter database data when saved.
      setFaqCategoryListOriginal(JSON.parse(JSON.stringify(categories)));
    }
    fetch();
  }, []);

  const expandFaq = faq => {
    // Create a new faqCategoryList object where only the expand
    // property of the specified faq is changed to true
    setFaqCategoryList(
      faqCategoryList.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(f =>
            f.id === faq.id ? { ...f, expand: true } : f
          )
        };
      })
    );
  };

  const collapseFaq = faq => {
    // Create a new faqCategoryList object where only the expand
    // property of the specified faq is changed to false
    setFaqCategoryList(
      faqCategoryList.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(f =>
            f.id === faq.id ? { ...f, expand: false } : f
          )
        };
      })
    );
  };

  const expandAll = () => {
    // Create a new faqCategoryList object where the expand
    // property of all faqs is changed to true
    setFaqCategoryList(
      faqCategoryList.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(faq => ({ ...faq, expand: true }))
        };
      })
    );
  };

  const handleAdminChange = () => {
    if (admin) {
      if (
        JSON.stringify(faqCategoryList) !==
        JSON.stringify(faqCategoryListOriginal)
      ) {
        // save logic goes here!
      }
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  };

  const collapseAll = () => {
    // Create a new faqCategoryList object where the expand
    // property of all faqs is changed to false
    setFaqCategoryList(
      faqCategoryList.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(faq => ({ ...faq, expand: false }))
        };
      })
    );
  };

  return (
    <ContentContainer componentToTrack="FaqPage">
      <div style={{ width: "-webkit-fill-available", marginRight: "5%" }}>
        <EditToggleButton editMode={admin} onClick={handleAdminChange} />
        <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
        <ExpandButtons expandAll={expandAll} collapseAll={collapseAll} />
        {admin ? <FaqAdd /> : null}
        <FaqList
          faqCategoryList={faqCategoryList}
          admin={admin}
          expandFaq={expandFaq}
          collapseFaq={collapseFaq}
          setFaqCategoryList={setFaqCategoryList}
        />
      </div>
    </ContentContainer>
  );
};

FaqView.propTypes = {
  toggleChecklistModal: PropTypes.func,
  checklistModalOpen: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      showChecklist: PropTypes.string
    })
  })
};

export default withRouter(FaqView);
