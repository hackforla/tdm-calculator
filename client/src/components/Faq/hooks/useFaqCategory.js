import { useState, useEffect, useCallback } from "react";
import * as faqCategoryService from "../../../services/faqCategory.service";

const useFaqCategory = () => {
  const [faqCategoryList, setFaqCategoryList] = useState([]);
  const [highestFaqId, setHighestFaqId] = useState(0);
  const [highestCategoryId, setHighestCategoryId] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchFaqData();
  }, []);

  const fetchFaqData = async () => {
    const faqCategoryListResponse = await faqCategoryService.get();
    const categories = faqCategoryListResponse.data;

    let highestFaqId = 0;
    let highestCategoryId = 0;

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      highestCategoryId = Math.max(highestCategoryId, category.id);
      category.faqs = category.faqs ? JSON.parse(category.faqs) : [];
      if (category.faqs.length > 0) {
        const lastFaqId = category.faqs[category.faqs.length - 1].id;
        highestFaqId = Math.max(highestFaqId, lastFaqId);
      }
    }

    setHighestFaqId(highestFaqId);
    setHighestCategoryId(highestCategoryId);
    setFaqCategoryList(categories);
  };

  const handleAddCategory = () => {
    const lastDisplayOrder = faqCategoryList.length
      ? faqCategoryList[faqCategoryList.length - 1].displayOrder || 0
      : 0;
    const updatedHighestCategoryId = highestCategoryId + 1;

    const newCategory = {
      id: updatedHighestCategoryId,
      displayOrder: lastDisplayOrder + 10,
      name: "",
      faqs: []
    };
    setHighestCategoryId(updatedHighestCategoryId);
    setFaqCategoryList(prevState => [...prevState, newCategory]);
  };

  const handleDeleteCategory = categoryId => {
    setFaqCategoryList(prevState =>
      prevState.filter(category => category.id !== categoryId)
    );
  };

  const handleAddFAQ = (category, question, answer) => {
    const { faqs, id: categoryId } = category;
    const lastDisplayOrder = faqs.length
      ? [faqs.length - 1].displayOrder || 0
      : 0;
    const updatedHighestFaqId = highestFaqId + 1;
    const newFaq = {
      id: updatedHighestFaqId,
      question,
      answer,
      faqCategoryId: categoryId,
      expand: false,
      displayOrder: lastDisplayOrder + 10
    };

    setHighestFaqId(updatedHighestFaqId);

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

  const handleEditCategory = (category, name) => {
    setFaqCategoryList(prevState =>
      prevState.map(cat => {
        if (cat.id === category.id) {
          return {
            ...cat,
            name // Update the category name
          };
        }
        return cat;
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
      const expanded = !prevState[0].faqs[0].expand;

      return prevState.map(cat => {
        return {
          ...cat,
          faqs: cat.faqs.map(faq => ({ ...faq, expand: expanded }))
        };
      });
    });
  };

  const submitFaqData = useCallback(async () => {
    const categories = [...faqCategoryList];

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].faqs) {
        categories[i].faqs = categories[i].faqs.map(faq => {
          /**
           * Iterate over the categories and removes the expand property
           * from each faq using object destructuring. This step ensures that
           * only the necessary data is included in the POST request payload.
           */

          // eslint-disable-next-line no-unused-vars
          const { expand, ...rest } = faq;
          return rest;
        });
      }
    }
    // await faqService.post(categories.flatMap(category => category.faqs));
    await faqCategoryService.post(categories);

    // Handle the responses if needed
  }, [faqCategoryList]);

  return {
    expanded,
    faqCategoryList,
    setFaqCategoryList,
    handleAddCategory,
    handleDeleteCategory,
    handleAddFAQ,
    handleEditFAQ,
    handleEditCategory,
    handleDeleteFAQ,
    expandFaq,
    collapseFaq,
    toggleExpandCollapse,
    submitFaqData
  };
};

export default useFaqCategory;
