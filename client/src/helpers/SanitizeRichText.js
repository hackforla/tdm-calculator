import DomPurify from "dompurify";

export const sanitizeHtml = dirtyContent => {
  return DomPurify.sanitize(dirtyContent);
};
