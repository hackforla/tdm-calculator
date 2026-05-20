const sanitizeHtml = require("sanitize-html");
const { sanitize } = require("../app/utils/sanitize-html");

jest.mock("sanitize-html");

describe("sanitize-html helper", () => {
  beforeEach(() => {
    sanitizeHtml.mockClear();
  });

  it("exports a sanitize function", () => {
    expect(typeof sanitize).toBe("function");
  });

  it("passes dirty HTML into sanitize-html and returns its result", () => {
    const dirty = "<div><script>alert(1)</script><p>Hello</p></div>";
    const sanitized = "<div><p>Hello</p></div>";

    sanitizeHtml.mockReturnValue(sanitized);

    const result = sanitize(dirty);

    expect(sanitizeHtml).toHaveBeenCalledTimes(1);
    expect(sanitizeHtml).toHaveBeenCalledWith(dirty);
    expect(result).toBe(sanitized);
  });
});
