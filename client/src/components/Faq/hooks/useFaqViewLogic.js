import { useState, useEffect, useCallback } from "react";
import * as faqService from "../../../services/faq.service";
import * as faqCategoryService from "../../../services/faqCategory.service";

const useFaqViewLogic = (toggleChecklistModal, checklistModalOpen, match) => {
  const [admin, setAdmin] = useState(false);
  const [faqCategoryList, setFaqCategoryList] = useState([]);
  const [faqCategoryListOriginal, setFaqCategoryListOriginal] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showChecklist, setShowChecklist] = useState(
    match.params.showChecklist || false
  );

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
    async function fetchFaqData() {
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
      setFaqCategoryListOriginal(JSON.parse(JSON.stringify(categories)));
    }
    fetchFaqData();
  }, []);

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

  const handleDeleteCategory = useCallback(category => {
    setFaqCategoryList(prevState =>
      prevState.filter(item => item.id !== category.id)
    );
  }, []);

  const handleDeleteFaq = useCallback(faq => {
    const updatedCategoryList = faqCategoryList.map(category => {
      const updatedCategory = { ...category };
      updatedCategory.faqs = updatedCategory.faqs.filter(
        item => item.id !== faq.id
      );
      return updatedCategory;
    });
    setFaqCategoryList(updatedCategoryList);
  }, []);

  const handleSetCategories = cat => {
    setFaqCategoryList(cat);
  };

  return {
    admin,
    faqCategoryList,
    expandFaq,
    collapseFaq,
    expanded,
    toggleExpandCollapse,
    handleAdminChange,
    handleDragEnd,
    handleDeleteCategory,
    handleDeleteFaq,
    handleSetCategories
  };
};

export default useFaqViewLogic;
