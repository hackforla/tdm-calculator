import fetchEngineRules from "./fetchEngineRules";
// These are the calculation results we want to calculate
// and display on the main page.
// TODO: share these constants with the real thing in TdmCalculationContainer?
const mapCsvRules = (project, rules) => {
  // Specify which rules we want to include in the CSV, and in what order by code.
  const includeRuleCodes = [
    "PROJECT_NAME",
    "PROJECT_ADDRESS",
    "APN",
    "VERSION_NO",
    "BUILDING_PERMIT",
    "CASE_NO_LADOT",
    "CASE_NO_PLANNING",
    "PROJECT_DESCRIPTION",
    "PROJECT_LEVEL",
    "PARK_REQUIREMENT",
    "PARK_SPACES",
    "CALC_PARK_RATIO",
    "TARGET_POINTS_PARK",
    "PTS_EARNED",
    "PTS_PKG_RESIDENTIAL_COMMERCIAL",
    "PTS_PKG_SCHOOL",
    "STRATEGY_AFFORDABLE",
    "STRATEGY_BIKE_1",
    "STRATEGY_BIKE_3",
    "STRATEGY_BIKE_4",
    "STRATEGY_BIKE_5",
    "STRATEGY_CAR_SHARE_1",
    "STRATEGY_CAR_SHARE_3",
    "STRATEGY_CAR_SHARE_4",
    "STRATEGY_CAR_SHARE_ELECTRIC",
    "STRATEGY_CAR_SHARE_BONUS",
    "STRATEGY_CHILD_CARE",
    "STRATEGY_HOV_2",
    "STRATEGY_HOV_3",
    "STRATEGY_HOV_4",
    "STRATEGY_HOV_5",
    "STRATEGY_INFO_1",
    "STRATEGY_INFO_2",
    "STRATEGY_INFO_3",
    "STRATEGY_INFO_5",
    "STRATEGY_MIXED_USE",
    "STRATEGY_MOBILITY_INVESTMENT_1",
    "STRATEGY_MOBILITY_INVESTMENT_2",
    "STRATEGY_PARKING_1",
    "STRATEGY_PARKING_2",
    "STRATEGY_PARKING_3",
    "STRATEGY_PARKING_4",
    "STRATEGY_PARKING_5",
    "STRATEGY_SHARED_MOBILITY_1",
    "STRATEGY_SHARED_MOBILITY_2",
    "STRATEGY_TELECOMMUTE_1",
    "STRATEGY_TELECOMMUTE_2",
    "STRATEGY_TRANSIT_ACCESS_1",
    "STRATEGY_TRANSIT_ACCESS_3",
    "STRATEGY_TRANSIT_ACCESS_4",
    "STRATEGY_TRANSIT_ACCESS_5",
    "STRATEGY_TMO_1",
    "STRATEGY_TMO_2",
    "STRATEGY_APPLICANT",
    "UNITS_CONDO",
    "PARK_CONDO",
    "UNITS_HABIT_LT3",
    "UNITS_HABIT_3",
    "UNITS_HABIT_GT3",
    "AFFORDABLE_HOUSING",
    "UNITS_GUEST",
    "SF_RETAIL",
    "SF_FURNITURE",
    "SF_RESTAURANT",
    "SF_HEALTH_CLUB",
    "SF_RESTAURANT_TAKEOUT",
    "SF_OFFICE",
    "SF_INST_GOV",
    "SF_INST_OTHER",
    "SF_INDUSTRIAL",
    "SF_WAREHOUSE",
    "SF_INST_MEDICAL_SVC",
    "SF_HOSPITAL",
    "STUDENTS_ELEMENTARY",
    "CLASSROOM_SCHOOL",
    "STUDENTS_TRADE_SCHOOL",
    "HS_STUDENTS",
    "HS_AUDITORIUM_SEATS",
    "HS_AUDITORIUM_SF",
    "SEAT_AUDITORIUM",
    "SF_AUDITORIUM_NO_SEATS"
  ];

  // Get the needed data from the rule calculation
  // flatMap/filter improves testability by allowing missing rules.
  const orderedRules = includeRuleCodes
    .flatMap(rc => rules.find(r => r.code === rc))
    .filter(r => !!r)
    .map(r => ({
      code: r.code,
      name: r.name,
      dataType: r.dataType,
      choices: r.choices,
      value: r.value,
      units: r.units
    }));

  // Augment with meta-data from project table that is not included in rules.
  const projectProperties = [
    {
      code: "Id",
      name: "Project Id",
      dataType: "project",
      choices: null,
      value: project.id
    },
    {
      code: "Author FN",
      name: "Author First Name",
      dataType: "project",
      choices: null,
      value: project.firstName
    },
    {
      code: "Author LN",
      name: "Author Last Name",
      dataType: "project",
      choices: null,
      value: project.lastName
    },
    {
      code: "Date Created",
      name: "Date Created",
      dataType: "project",
      choices: null,
      value: project.dateCreated
    },
    {
      code: "Date Modified",
      name: "Date Modified",
      dataType: "project",
      choices: null,
      value: project.dateModified
    },
    {
      code: "Date Hidden",
      name: "Date Hidden",
      dataType: "project",
      choices: null,
      value: project.dateHidden
    },
    {
      code: "Date Deleted",
      name: "Date Deleted",
      dataType: "project",
      choices: null,
      value: project.dateTrashed
    },
    {
      code: "Date Snapshotted",
      name: "Date Snapshotted",
      dataType: "project",
      choices: null,
      value: project.dateSnapshotted
    }
  ];

  let columnData = projectProperties.concat(orderedRules);

  const ruleNames = columnData.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice => rule.name + " - " + choice.name);
    } else {
      return `${rule.name}${rule.units ? " (" + rule.units + ")" : ""}`;
    }
  });

  const ruleValues = columnData.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice =>
        choice.id == rule.value || (choice.id == 0 && !rule.value) ? "Y" : "N"
      );
    } else {
      return rule.value ? rule.value.toString() : "";
    }
  });

  const flat = [
    ["TDM Calculation Project Summary"],
    ["Date Printed: " + Date().toString()], // TODO: prefer ISO string?
    [],
    ruleNames,
    ruleValues
  ];
  return flat;
};

const pdfCsvData = async project => {
  const rules = await fetchEngineRules(project);
  const csvData = project && mapCsvRules(project, rules || []);
  const arrRulesFormat = {
    rules: rules,
    csvData: csvData
  };
  return arrRulesFormat;
};

const allProjectRulesCsv = async projectids => {
  let allrules;
  if (projectids.length != 0) {
    const firstElement = await pdfCsvData(projectids[0]);
    allrules = firstElement.csvData;
    for (let index = 1; index < projectids.length; index++) {
      const element = await pdfCsvData(projectids[index]);
      allrules = allrules.concat(element.csvData.slice(4)); // Concatenate data excluding header rows
    }
  }
  return allrules;
};

export { allProjectRulesCsv };
export default pdfCsvData;
