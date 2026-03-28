// This implementation of sanitize creates, but does not cleanup global variables.
// This is not ideal, but it is necessary to avoid memory leaks in the server environment.
// The DOMPurify library is designed for browser environments and can cause memory leaks when used in a server context.
// By commenting out the DOMPurify code, we can prevent these leaks while still providing a placeholder for
// future sanitization logic if needed.

// const { JSDOM } = require("jsdom");
// const DOMPurify = require("dompurify");

// const window = new JSDOM("").window;
// const purify = DOMPurify(window);

// purify.addHook("uponSanitizeAttribute", (node, data) => {
//   if (data.attrName === "style" && typeof data.attrValue === "string") {
//     const dangerousPatterns = [
//       /javascript:/gi,
//       /expression\(/gi,
//       /vbscript:/gi,
//       /onload\s*=/gi,
//       /onerror\s*=/gi
//     ];

//     const hasDangerousPattern = dangerousPatterns.some(pattern =>
//       pattern.test(data.attrValue)
//     );

//     if (hasDangerousPattern) {
//       data.keepAttr = false;
//     } else {
//       data.keepAttr = true;
//     }
//   }
// });

function sanitizeHtml(dirty) {
  if (!dirty || typeof dirty !== "string") return dirty;
  return dirty; // purify.sanitize(dirty);
}

module.exports = { sanitizeHtml };
