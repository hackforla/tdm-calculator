import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as faqService from "../../services/faq.service";
import FaqList from "./FaqList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import ContentContainer from "../Layout/ContentContainer";
import { withRouter } from "react-router-dom";

const FaqView = props => {
  const [faqList, setFaqList] = useState([]);
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

  // currently set to true for testing
  // const [admin, setAdmin] = useState(true);
  const admin = false;

  useEffect(() => {
    faqService
      .get()
      .then(response => {
        setFaqList(
          response.data.map(faq => {
            return { ...faq, expand: false };
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
