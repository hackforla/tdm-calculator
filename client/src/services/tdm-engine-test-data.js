const rules = [
  {
    code: "SF_TOTAL",
    name: "Total Square Footage",
    category: "input",
    dataType: "number",
    displayOrder: 100,
    units: "sf"
  },
  {
    code: "LAND_USE_RESIDENTIAL",
    name: "Land Use % Residential",
    category: "input",
    dataType: "number",
    displayOrder: 210,
    units: "percent"
  },
  {
    code: "LAND_USE_COMMERCIAL",
    name: "Land Use % Commercial",
    category: "input",
    dataType: "number",
    displayOrder: 220,
    units: "percent"
  },
  {
    code: "LAND_USE_INSTITUITIONAL",
    name: "Land Use % Institutional",
    category: "input",
    dataType: "number",
    displayOrder: 230,
    units: "percent"
  },
  {
    code: "LAND_USE_OTHER",
    name: "Land Use % School / Other",
    category: "input",
    dataType: "number",
    displayOrder: 240,
    units: "percent"
  },
  {
    code: "PARK_SPACES",
    name: "Number of Parking Spaces",
    category: "input",
    dataType: "number",
    units: "spots"
  },
  { code: "SF_RETAIL", name: "Retail Sq Ft", category: "input", units: "sf" },
  {
    code: "SF_RETAIL_PARKING_MULTIPLIER",
    name: "Parking Spaces / 1000 Sq Ft, Retail",
    category: "constant",
    value: 4,
    dataType: "number",
    units: "spots/1000sf"
  },
  {
    code: "SF_RESTAURANT",
    name: "Sq Ft - Restaurant/Bar/General",
    category: "input",
    dataType: "number",
    units: "sf"
  },
  {
    code: "SF_RESTAURANT_PARKING_MULTIPLIER",
    name: "Parking Spaces / 1000 Sq Ft, Restaurant",
    category: "constant",
    value: 10,
    dataType: "number",
    units: "spots/1000sf"
  },
  {
    code: "TARGET_POINTS_PARK",
    name: "Target Points for Parking",
    category: "calculation",
    functionBody: `
        const ratio = <<PARK_SPACES>> / <<PARK_REQUIREMENT>>;
        const level = <<LEVEL>>;
        if(ratio < 1.1){
            switch(level){
                case 1:
                    return 15;
                    break;
                case 2:
                    return 20;
                    break;
                default:
                    return 25;
            }
        } else if(ratio < 1.2){
            switch(level){
                case 1:
                    return 17;
                    break;
                case 2:
                    return 22;
                    break;
                default:
                    return 27;
            }
        } else {
            switch(level){
                case 1:
                    return 25;
                    break;
                case 2:
                    return 30;
                    break;
                default:
                    return 35;
            }
        }
    `,
    units: "points"
  },
  {
    code: "PARK_REQUIREMENT",
    name: "Total Parking Spaces",
    category: "calculation",
    functionBody: `
    return <<PARK_RESIDENTIAL>> + <<PARK_COMMERCIAL>> + <<PARK_INSTITUTIONAL>> + <<PARK_OTHER>>;
    `,
    dataType: "number",
    units: "spots"
  },
  {
    code: "PARK_RESTAURANT",
    name: "Parking Spaces for Restaurants & Bars",
    category: "calculation",
    functionBody: "return <<SF_RESTAURANT>>/1000 * 10;",
    dataType: "number",
    units: "spots"
  },
  {
    code: "PARK_RETAIL",
    name: "Parking Spaces for Retail",
    category: "calculation",
    functionBody: "return <<SF_RETAIL>>/1000 * 4;",
    dataType: "number",
    units: "spots"
  },
  {
    Key: "LEVEL",
    name: "Level",
    category: "calculation",
    functionBody: `
        if( <<SF_TOTAL>> < 50000){
            return 1;
        }
        else if (<<SF_TOTAL>> < 100000){
            return 2;
        } else {
            return 3;
        }
    `,
    dataType: "numeric",
    units: ""
  },
  {
    code: "PARK_RETAIL",
    name: "Parking Spaces for Retail",
    category: "calculation",
    functionBody: "return <<UNITS_GUEST_LT30>>/1000;",
    dataType: "number",
    units: "spots"
  }
];

const example0 = {
  SF_TOTAL: 50000,
  LAND_USE_COMMERCIAL: 1.0,
  UNITS_HABIT_LT3: 18,
  UNITS_HABIT_3: 16,
  PARK_SPACES: 33
};

const example1 = {
  SF_TOTAL: 50000,
  LAND_USE_COMMERCIAL: 1.0,
  SF_RETAIL: 19500,
  SF_RESTAURANT: 30500,
  PARK_SPACES: 330
};

module.exports = {
  rules,
  example0,
  example1
};
