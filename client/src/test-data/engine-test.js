const engineTestRules = [
  {
    code: "INPUT_INTEGER_A",
    name: "Input Integer A",
    category: "input",
    dataType: "number",
    units: "beans"
  },
  {
    code: "INPUT_INTEGER_B",
    name: "Input Integer B",
    category: "input",
    dataType: "number",
    units: "beans"
  },
  {
    code: "INPUT_FLOAT_X",
    name: "Input Float X",
    category: "input",
    dataType: "number",
    value: null,
    units: "liters"
  },
  {
    code: "INPUT_FLOAT_Y",
    name: "Input Float Y",
    category: "input",
    dataType: "number",
    value: null,
    units: "liters"
  },
  {
    code: "INPUT_BOOLEAN_1",
    name: "Input Boolean 1",
    category: "input",
    dataType: "boolean",
    value: null,
    units: null
  },
  {
    code: "INPUT_BOOLEAN_2",
    name: "Input Boolean 2",
    category: "input",
    dataType: "boolean",
    value: null,
    units: null
  },
  {
    code: "INPUT_STRING_1",
    name: "Input String 1",
    category: "input",
    dataType: "string",
    value: null,
    units: null
  },
  {
    code: "INPUT_STRING_2",
    name: "Input String 2",
    category: "input",
    dataType: "string",
    value: null,
    units: null
  },
  {
    code: "CALC_A_PLUS_B",
    name: "A + B",
    category: "calculation",
    dataType: "number",
    value: null,
    functionBody: `return <<INPUT_INTEGER_A>> + <<INPUT_INTEGER_B>>;`,
    units: "beans"
  },
  {
    code: "CALC_A_TIMES_B",
    name: "A * B",
    category: "calculation",
    dataType: "number",
    value: null,
    functionBody: `return <<INPUT_INTEGER_A>> * <<INPUT_INTEGER_B>>;`,
    units: "beans"
  },
  {
    code: "CALC_A_LT_B",
    name: "A < B",
    category: "calculation",
    dataType: "boolean",
    value: null,
    functionBody: `return <<INPUT_INTEGER_A>> < <<INPUT_INTEGER_B>>;`,
    units: null
  },
  {
    code: "CALC_A_EQ_B",
    name: "A = B",
    category: "calculation",
    dataType: "boolean",
    value: null,
    functionBody: `return <<INPUT_INTEGER_A>> === <<INPUT_INTEGER_B>>;`,
    units: null
  },
  {
    code: "CALC_A_PLUS_B_PLUS_A_TIMES_B",
    name: "A + B + A*B",
    category: "calculation",
    dataType: "number",
    value: null,
    functionBody: `return <<CALC_A_PLUS_B>> + <<CALC_A_TIMES_B>>;`,
    units: "beans"
  },
  {
    code: "CALC_A2_PLUS_B2",
    name: "A*A + B*B",
    category: "calculation",
    dataType: "number",
    value: null,
    functionBody: `return <<INPUT_INTEGER_A>> * <<INPUT_INTEGER_A>> + <<INPUT_INTEGER_B>> * <<INPUT_INTEGER_B>>;`,
    units: "beans"
  },
  {
    code: "CALC_HYPOTENUSE_AB",
    name: "Hypotenuse of Triangle with Sides A and B",
    category: "calculation",
    dataType: "number",
    value: null,
    functionBody: `return Math.sqrt(<<INPUT_INTEGER_A>> * <<INPUT_INTEGER_A>> + <<INPUT_INTEGER_B>> * <<INPUT_INTEGER_B>>);`,
    units: "beans"
  }
];

const engineTestInput1 = {
  INPUT_INTEGER_A: 7,
  INPUT_INTEGER_B: 13,
  INPUT_FLOAT_X: 5.2,
  INPUT_FLOAT_Y: 8.7,
  INPUT_BOOLEAN_1: true,
  INPUT_BOOLEAN_2: false,
  INPUT_STRING_1: "Okey",
  INPUT_STRING_2: "Dokey"
};

const engineTestInput2 = {
  INPUT_INTEGER_A: 7,
  INPUT_INTEGER_B: 13,
  INPUT_FLOAT_X: 5.2,
  INPUT_FLOAT_Y: 8.7,
  INPUT_BOOLEAN_1: true,
  INPUT_BOOLEAN_2: false,
  INPUT_STRING_1: "Okey",
  INPUT_STRING_2: "Dokey"
};

module.exports = {
  engineTestRules,
  engineTestInput1,
  engineTestInput2
};
