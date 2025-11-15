import { useEffect } from "react";

/**
 * Custom hook to remove aria-describedby attribute from a popup trigger element
 * and optionally set aria-controls attribute to link it to the popup content.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.elementId - The ID of the popup trigger element.
 * @param {Array} params.deps - The dependency array for the useEffect hook.
 * @param {boolean} [params.setControls=false] - Whether to set the aria-controls attribute.
 * @returns {Object} An object containing the popup content ID.
 */

export const useRemovePopupAriaIssue = ({ elementId, deps, setControls }) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.removeAttribute("aria-describedby");
      if (setControls) {
        element.setAttribute("aria-controls", `popup-content-${elementId}`);
      }
    }
  }, [deps, elementId, setControls]);

  if (!setControls) {
    return {};
  }

  return { popupContentId: `popup-content-${elementId}` };
};
