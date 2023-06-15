import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FaqCategoryList from "./FaqCategoryList";
import ExpandButtons from "./ExpandButtons";
import EditToggleButton from "../Button/EditToggleButton";
import ContentContainer from "../Layout/ContentContainer";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import * as faqService from "../../services/faq.service";
import * as faqCategoryService from "../../services/faqCategory.service";

const FaqView = () => {
  const [faqCategoryList, setFaqCategoryList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetchFaqData();
  }, []);

  const handleDragEnd = result => {
    const { type, destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    setFaqCategoryList(prevState => {
      const newState = [...prevState];

      if (type === "faq") {
        const sourceCategoryIndex = prevState.findIndex(
          c => "c" + c.id === result.source.droppableId
        );
        const destinationCategoryIndex = prevState.findIndex(
          c => "c" + c.id === result.destination.droppableId
        );

        const sourceFaqs = [...prevState[sourceCategoryIndex].faqs];
        const [draggedFaq] = sourceFaqs.splice(source.index, 1);

        newState[sourceCategoryIndex] = {
          ...prevState[sourceCategoryIndex],
          faqs: sourceFaqs
        };

        if (destination.droppableId === source.droppableId) {
          const newFaqs = [...sourceFaqs];
          newFaqs.splice(destination.index, 0, draggedFaq);
          newState[sourceCategoryIndex].faqs = newFaqs;
        } else {
          const destinationFaqs = [...prevState[destinationCategoryIndex].faqs];
          destinationFaqs.splice(destination.index, 0, draggedFaq);

          newState[destinationCategoryIndex] = {
            ...prevState[destinationCategoryIndex],
            faqs: destinationFaqs
          };
        }
      } else if (type === "category") {
        const [draggedCategory] = newState.splice(source.index, 1);
        newState.splice(destination.index, 0, draggedCategory);
      }

      return newState;
    });
  };

  const fetchFaqData = async () => {
    const faqListResponse = await faqService.get();
    const faqs = faqListResponse.data.map(faq => {
      return { ...faq, expand: false };
    });

    const faqCategoryListResponse = await faqCategoryService.get();
    const categories = faqCategoryListResponse.data;

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
  };

  const handleAddCategory = () => {
    const lastCategoryId = faqCategoryList[faqCategoryList.length - 1].id || 0;
    const newCategory = {
      id: lastCategoryId + 1,
      name: "",
      faqs: []
    };
    setFaqCategoryList(prevState => [...prevState, newCategory]);
  };

  const handleDeleteCategory = categoryId => {
    setFaqCategoryList(prevState =>
      prevState.filter(category => category.id !== categoryId)
    );
  };

  const handleAddFAQ = (categoryId, question, answer) => {
    const newFaq = {
      id: Date.now(),
      question,
      answer,
      faqCategoryId: categoryId,
      expand: false
    };

    setFaqCategoryList(prevState =>
      prevState.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            faqs: [...category.faqs, newFaq]
          };
        }
        return category;
      })
    );
  };

  const handleEditFAQ = (categoryId, faqId, question, answer) => {
    setFaqCategoryList(prevState =>
      prevState.map(category => {
        if (category.id === categoryId) {
          const updatedFaqs = category.faqs.map(faq => {
            if (faq.id === faqId) {
              return {
                ...faq,
                question,
                answer
              };
            }
            return faq;
          });

          return {
            ...category,
            faqs: updatedFaqs
          };
        }
        return category;
      })
    );
  };

  const handleDeleteFAQ = (categoryId, faqId) => {
    setFaqCategoryList(prevState =>
      prevState.map(category => {
        if (category.id === categoryId) {
          const updatedFaqs = category.faqs.filter(faq => faq.id !== faqId);

          return {
            ...category,
            faqs: updatedFaqs
          };
        }
        return category;
      })
    );
  };

  const expandFaq = faq => {
    setFaqCategoryList(prevState => {
      return prevState.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(f =>
            f.id === faq.id ? { ...f, expand: true } : f
          )
        };
      });
    });
  };

  const collapseFaq = faq => {
    setFaqCategoryList(prevState => {
      return prevState.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(f =>
            f.id === faq.id ? { ...f, expand: false } : f
          )
        };
      });
    });
  };

  const toggleExpandCollapse = () => {
    setExpanded(prevExpanded => !prevExpanded);
    setFaqCategoryList(prevState => {
      return prevState.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(faq => ({ ...faq, expand: !expanded }))
        };
      });
    });
  };

  const handleAdminChange = () => {
    if (admin) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
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
        <ExpandButtons
          expanded={expanded}
          toggleExpandCollapse={toggleExpandCollapse}
        />
        {admin && <button onClick={handleAddCategory}>Add New Category</button>}
        <DragDropContext onDragEnd={handleDragEnd}>
          <FaqCategoryList
            faqCategoryList={faqCategoryList}
            handleDeleteCategory={handleDeleteCategory}
            handleAddFAQ={handleAddFAQ}
            handleEditFAQ={handleEditFAQ}
            handleDeleteFAQ={handleDeleteFAQ}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
        </DragDropContext>
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
