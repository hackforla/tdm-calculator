import { useEffect } from "react";

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
};
