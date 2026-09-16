const sanitizeHtml = require("sanitize-html");

// Sanitize HTML input to prevent XSS attacks. Keep as a helper function, so we
// can easily update the sanitization rules in one place.
// The Quill Editor uses the "data-list" attribute, which is precluded by default by
// sanitize-html, so we need to allow it explicitly.
const sanitize = dirty => {
  // return sanitizeHtml(dirty);
  const clean = sanitizeHtml(dirty, {
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      li: ["data-list", "class"]
    }
  });
  return clean;
};

module.exports = { sanitize };
