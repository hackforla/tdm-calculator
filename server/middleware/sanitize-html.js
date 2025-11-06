const { JSDOM } = require("jsdom");
const DOMPurify = require("dompurify");

const window = new JSDOM("").window;
const purify = DOMPurify(window);

purify.addHook("uponSanitizeAttribute", (node, data) => {
  if (data.attrName === "style" && typeof data.attrValue === "string") {
    const dangerousPatterns = [
      /javascript:/gi,
      /expression\(/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
      /onerror\s*=/gi
    ];

    const hasDangerousPattern = dangerousPatterns.some(pattern =>
      pattern.test(data.attrValue)
    );

    if (hasDangerousPattern) {
      data.keepAttr = false;
    } else {
      data.keepAttr = true;
    }
  }
});

function sanitizeHtml(dirty) {
  if (!dirty || typeof dirty !== "string") return dirty;
  return purify.sanitize(dirty);
}

module.exports = { sanitizeHtml };
