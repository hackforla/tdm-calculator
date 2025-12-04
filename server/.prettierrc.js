// Exporting an empty object for the .prettierrc
// overrides and User or Workspace settings the
// user may have set, so the project enforces
// using default prettier settings.
module.exports = {
  trailingComma: "none", // deafult changed in prettier 2+
  arrowParens: "avoid", // default changed in prettier 2+
  endOfLine: "auto"
};
