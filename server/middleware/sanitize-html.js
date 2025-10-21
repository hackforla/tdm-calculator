import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export const sanitizeHtml = dirty => {
  if (!dirty || typeof dirty !== "string") return dirty;

  return purify.sanitize(dirty);
};
