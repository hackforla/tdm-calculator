import { sanitizeHtml } from "./SanitizeRichText";

describe("SanitizeHtml", () => {
  describe("it should sanitize basic script tags", () => {
    it("return no scripts in html", () => {
      const maliciousInput = '<script>alert("XSS")</script>';
      const result = sanitizeHtml(maliciousInput);
      expect(result).toBe("");
    });
  });
});

describe("Event Handler Attributes", () => {
  it("should remove onerror from img tags", () => {
    const maliciousInput = '<img src="x" onerror="alert(\'XSS\')">';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("onerror");
    expect(result).not.toContain("alert");
  });

  it("should remove onclick from elements", () => {
    const maliciousInput = "<div onclick=\"alert('XSS')\">Click me</div>";
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("onclick");
  });

  it("should remove onmouseover from elements", () => {
    const maliciousInput = '<p onmouseover="alert(1)">Hover</p>';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("onmouseover");
  });

  it("should remove onload from iframe tags", () => {
    const maliciousInput = "<iframe onload=\"alert('XSS')\"></iframe>";
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("onload");
    expect(result).not.toContain("alert");
  });

  it("should remove multiple event handlers", () => {
    const maliciousInput =
      '<div onclick="alert(1)" onmouseover="alert(2)" onfocus="alert(3)">Test</div>';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toMatch(/on(click|mouseover|focus)/);
  });
});

describe("javascript: protocol links", () => {
  it("should remove javascript: from href attributes", () => {
    const maliciousInput = "<a href=\"javascript:alert('XSS')\">Click</a>";
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("javascript:");
    expect(result).not.toContain("alert");
  });

  it("should remove javascript: from src attributes", () => {
    const maliciousInput = "<img src=\"javascript:alert('XSS')\">";
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("javascript:");
  });

  it("should handle javascript: with various encodings", () => {
    const maliciousInput = '<a href="j&#97;vascript:alert(1)">Link</a>';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("javascript:");
    expect(result).not.toContain("j&#97;vascript:");
  });
});

describe("Inline styles and CSS-based attacks", () => {
  it("should handle javascript: in styles", () => {
    const maliciousInput =
      "<div style=\"background:url('javascript:alert(1)')\">Test</div>";
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("javascript:");
  });
});

describe("Valid HTML should be preserved", () => {
  it("should preserve safe HTML tags", () => {
    const safeInput = "<p>Hello <strong>World</strong></p>";
    const result = sanitizeHtml(safeInput);
    expect(result).toContain("<p>");
    expect(result).toContain("<strong>");
    expect(result).toContain("Hello");
    expect(result).toContain("World");
  });

  it("should preserve safe links", () => {
    const safeInput = '<a href="https://example.com">Safe Link</a>';
    const result = sanitizeHtml(safeInput);
    expect(result).toContain("<a");
    expect(result).toContain("https://example.com");
  });

  it("should preserve safe images", () => {
    const safeInput =
      '<img src="https://example.com/image.jpg" alt="Description">';
    const result = sanitizeHtml(safeInput);
    expect(result).toContain("<img");
    expect(result).toContain('src="https://example.com/image.jpg"');
  });
});

describe("iframe and embed tags", () => {
  it("should remove iframe tags", () => {
    const maliciousInput = '<iframe src="http://evil.com"></iframe>';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("<iframe");
  });

  it("should remove embed tags", () => {
    const maliciousInput = '<embed src="http://evil.com"></embed>';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("<embed");
  });

  it("should remove object tags", () => {
    const maliciousInput = '<object data="http://evil.com"></object>';
    const result = sanitizeHtml(maliciousInput);
    expect(result).not.toContain("<object");
  });
});
