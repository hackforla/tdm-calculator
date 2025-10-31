import DomPurify from "dompurify";

// Hook to allow safe CSS while blocking dangerous ones
DomPurify.addHook("uponSanitizeAttribute", (node, data) => {
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

export const sanitizeHtml = dirtyContent => {
  return DomPurify.sanitize(dirtyContent);
};
