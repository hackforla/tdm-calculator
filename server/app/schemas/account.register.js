module.exports = {
  type: "object",
  required: ["firstName", "lastName", "email", "password"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      pattern: "^[a-zA-Z '.-]+$"
    },
    lastName: {
      type: "string",
      minLength: 1,
      pattern: "^[a-zA-Z '.-]+$"
    },
    email: {
      type: "string",
      minLength: 6,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      /*
        ^ and $ → Ensure the match is for the entire string.
        [a-zA-Z0-9._%+-]+ → Local part (before @), allows letters, digits, dots, underscores, percent, plus, and hyphen.
        @ → Mandatory separator.
        [a-zA-Z0-9.-]+ → Domain name part, allows letters, digits, dots, and hyphens.
        \\. → Literal dot before the TLD.
        [a-zA-Z]{2,} → Top-level domain (at least 2 letters, e.g., .com, .org).
      */
    },
    password: {
      type: "string",
      minLength: 12,
      pattern:
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z0-9@$!%*#?&]{12,}$"
    }
  }
};
