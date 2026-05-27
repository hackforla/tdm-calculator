const sanitizeHtml = require("sanitize-html");

// Sanitize HTML input to prevent XSS attacks. Keep as a helper function, so we
// can easily update the sanitization rules in one place.
const sanitize = dirty => {
  return sanitizeHtml(dirty);
  // return dirty;
};

module.exports = { sanitize };
