import { useEffect } from "react";

/**
 * Custom hook to remove aria-describedby attribute from a popup trigger element
 * and optionally set aria-controls attribute to link it to the popup content.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.elementId - The ID of the popup trigger element.
 * @param {Array} params.deps - The dependency array for the useEffect hook.
 * @param {attrToAdd} params.attrToAdd - The aria attribute to add.
 * @param {attrToRemove} params.attrToRemove - The aria attribute to remove.
 * @param {string} params.value - The value to set for the added aria attribute.
 * @returns - No return value.
 */

export const useReplaceAriaAttribute = ({
  elementId,
  deps,
  attrToRemove,
  attrToAdd,
  value
}) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.removeAttribute(attrToRemove);
      element.setAttribute(attrToAdd, value);
    }
  }, [deps, elementId, attrToRemove, attrToAdd, value]);
};
