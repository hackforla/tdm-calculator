import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as faqService from "../../services/faq.service";
import * as faqCategoryService from "../../services/faqCategory.service";
import FaqCategoryList from "./FaqCategoryList";
import FaqAdd from "./FaqAdd";
import ExpandButtons from "./ExpandButtons";
import EditToggleButton from "../Button/EditToggleButton";
import ContentContainer from "../Layout/ContentContainer";
import { withRouter } from "react-router-dom";

import { arrayMove } from "@dnd-kit/sortable";

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
      const FaqCategoryList = await faqService.get();
      const faqs = FaqCategoryList.data.map(faq => {
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

  const moveCategory = (categoryId, replaceCategoryId) => {
    const cId = Number(categoryId.replace(/\D/g, ""));
    const rId = Number(replaceCategoryId.replace(/\D/g, ""));
    setFaqCategoryList(prevState => {
      const oldIndex = faqCategoryList.indexOf(
        faqCategoryList.find(c => c.id === cId)
      );
      const newIndex = faqCategoryList.indexOf(
        faqCategoryList.find(c => c.id === rId)
      );

      return arrayMove(prevState, oldIndex, newIndex);
    });
  };

  const moveFaq = (activeId, overId) => {
    const aId = Number(activeId.replace(/\D/g, ""));
    const activeCategory = faqCategoryList.find(cat =>
      cat.faqs.find(f => f.id === aId)
    );
    const activeFaqIndex = activeCategory.faqs.findIndex(f => f.id === aId);
    const activeFaq = activeCategory.faqs[activeFaqIndex];
    const oId = Number(overId.replace(/\D/g, ""));
    if (overId.startsWith("faq")) {
      const overCategory = faqCategoryList.find(cat =>
        cat.faqs.find(f => f.id === oId)
      );
      if (activeCategory.id === overCategory.id) {
        // Remove faq from it's old location
        const overFaqIndex = activeCategory.faqs.findIndex(f => f.id === oId);
        activeCategory.faqs.splice(activeFaqIndex, 1);
        // Re-insert it in its new location
        overCategory.faqs.splice(overFaqIndex, 0, activeFaq);
      } else {
        // Remove faq from it's old location
        activeCategory.faqs.splice(activeFaqIndex, 1);
        // Re-insert it in its new location
        const overFaqIndex = overCategory.faqs.findIndex(f => f.id === oId);
        overCategory.faqs.splice(overFaqIndex, 0, activeFaq);
      }
    } else {
      // overId refers to a category
      const oCategory = faqCategoryList.find(c => c.id === oId);
      // Remove faq from it's old location
      activeCategory.faqs.splice(activeFaqIndex, 1);
      // Insert faq at the beginning of the over category
      oCategory.faqs.splice(0, 0, activeFaq);
    }
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
        <EditToggleButton
          id="EditToggleButton"
          editMode={admin}
          onClick={handleAdminChange}
        />
        <h1 className="tdm-wizard-page-title">Frequently Asked Questions</h1>
        <ExpandButtons expandAll={expandAll} collapseAll={collapseAll} />
        {admin ? <FaqAdd /> : null}
        <FaqCategoryList
          faqCategoryList={faqCategoryList}
          admin={admin}
          expandFaq={expandFaq}
          collapseFaq={collapseFaq}
          setFaqCategoryList={setFaqCategoryList}
          moveCategory={moveCategory}
          moveFaq={moveFaq}
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
