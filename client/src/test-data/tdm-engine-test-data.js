const simpleRules = [
  { code: "SF_RETAIL", name: "Retail Sq Ft", category: "input", units: "sf" },
  {
    code: "SF_RESTAURANT",
    name: "Sq Ft - Restaurant/Bar/General",
    category: "input",
    dataType: "number",
    value: null,
    units: "sf"
  },
  {
    code: "PARK_RESTAURANT",
    name: "Parking Spaces for Restaurants & Bars",
    category: "calculation",
    functionBody: "return <<SF_RESTAURANT>>/1000 * 10;",
    dataType: "number",
    value: null,
    units: "spaces"
  },
  {
    code: "PARK_RETAIL",
    name: "Parking Spaces for Retail",
    category: "calculation",
    functionBody: "return <<SF_RETAIL>>/1000 * 4;",
    dataType: "number",
    value: null,
    units: "spaces"
  },
  {
    code: "PARK_REQUIREMENT",
    name: "Parking Requirement",
    category: "calculation",
    functionBody: `
        return <<PARK_RETAIL>> + <<PARK_RESTAURANT>>;
    `,
    dataType: "numeric",
    value: null,
    units: "spaces"
  }
];

const example0 = {
  SF_RETAIL: 4000,
  SF_RESTAURANT: 3000
};

const example1 = {
  SF_RETAIL: 19500,
  SF_RESTAURANT: 30500
};

module.exports = {
  simpleRules,
  example0,
  example1
};
