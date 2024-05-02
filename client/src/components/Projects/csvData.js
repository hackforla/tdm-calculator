import fetchEngineRules from "./fetchEngineRules";

// This method gets properties from the project object and converts them to
// an array of objects that look enough like rules to concatenate with an
// array of actual rules for purposes of processing the combined data, including
// a dummy code value that can be used to sort the colums in the order specified by
// the orderedCodes array below.
const getProjectProperties = project => {
  return [
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
      code: "Date Snapshotted",
      name: "Date Snapshotted",
      dataType: "project",
      choices: null,
      value: project.dateSnapshotted
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
      code: "Id",
      name: "Project Id",
      dataType: "project",
      choices: null,
      value: project.id
    }
  ];
};

// Used to determine which rules (and project properties) to include as collumns in the CSV,
// in the order they should appear in the CSV file.
const orderedCodes = [
  "PROJECT_NAME",
  "PROJECT_ADDRESS",
  "APN",
  "BUILDING_PERMIT",
  "CASE_NO_LADOT",
  "CASE_NO_PLANNING",
  "PROJECT_DESCRIPTION",
  "VERSION_NO",
  "Date Created",
  "Date Modified",
  "Date Snapshotted",
  "Date Hidden",
  "Date Deleted",
  "Author FN",
  "Author LN",
  "Id",
  "PROJECT_LEVEL",
  "TARGET_POINTS_PARK",
  "PTS_EARNED",
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
  "SF_AUDITORIUM_NO_SEATS",
  "PARK_REQUIREMENT",
  "PARK_SPACES",
  "CALC_PARK_RATIO",
  "PTS_PKG_RESIDENTIAL_COMMERCIAL",
  "PTS_PKG_SCHOOL",
  "STRATEGY_AFFORDABLE",
  "STRATEGY_BIKE_1",
  "STRATEGY_BIKE_3",
  "STRATEGY_BIKE_4",
  "STRATEGY_BIKE_5",
  "PTS_BIKE_BONUS",
  "STRATEGY_CAR_SHARE_1",
  "STRATEGY_CAR_SHARE_3",
  "STRATEGY_CAR_SHARE_4",
  "STRATEGY_CAR_SHARE_ELECTRIC",
  "PTS_CAR_SHARE_BONUS",
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
  "STRATEGY_APPLICANT_COMMENT"
];

const getOrderedColumnData = (project, rules) => {
  // Augment with meta-data from project table that is not included in rules.
  const projectProperties = getProjectProperties(project);

  // Append data from project table to data from rules computation
  const combinedRules = rules.concat(projectProperties);

  // Append a made-up "rule" to get user-defined strategy description
  const udsRule = rules.find(f => f.code === "STRATEGY_APPLICANT");
  if (udsRule) {
    combinedRules.push({
      code: "STRATEGY_APPLICANT_COMMENT",
      name: "User-Defined Strategy Description",
      dataType: "string",
      choices: null,
      value: udsRule.comment,
      units: ""
    });
  }

  // Get the needed data from the rule calculation
  // flatMap/filter improves testability by allowing missing rules.
  const columnData = orderedCodes
    .flatMap(rc => combinedRules.find(r => r.code === rc))
    .filter(r => !!r)
    .map(r => ({
      code: r.code,
      name: r.name,
      dataType: r.dataType,
      choices: r.choices,
      value: r.value,
      units: r.units
    }));
  return columnData;
};

const getColumnNames = (project, rules) => {
  const columnData = getOrderedColumnData(project, rules);

  const columnNames = columnData.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices
        .slice(1)
        .map(choice => rule.name + " - " + choice.name);
    } else {
      return `${rule.name}${rule.units ? " (" + rule.units + ")" : ""}`;
    }
  });
  return columnNames;
};

const getColumnValues = (project, rules) => {
  const columnData = getOrderedColumnData(project, rules);

  const cellValues = columnData.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices
        .slice(1)
        .map(choice =>
          choice.id == rule.value || (choice.id == 0 && !rule.value) ? "Y" : "N"
        );
    } else {
      if (rule.dataType === "boolean") {
        return rule.value ? "Y" : "N";
      } else if (rule.dataType === "number") {
        return rule.value ? rule.value.toString() : "0";
      }
      return rule.value ? rule.value.toString() : "";
    }
  });
  return cellValues;
};

const getFileHeading = () => {
  return [
    ["TDM Calculation Project Summary"],
    ["Date Printed: " + Date().toString()], // TODO: prefer ISO string?
    []
  ];
};

const getCsvForProjects = async (projects, progressCallback) => {
  let data = getFileHeading();
  if (projects.length != 0) {
    for (let i = 0; i < projects.length; i++) {
      const rules = await fetchEngineRules(projects[i]);
      if (i == 0) {
        data.push(getColumnNames(projects[i], rules));
      }
      data.push(getColumnValues(projects[i], rules));
      if (progressCallback) progressCallback((i + 1) / projects.length);
    }
  }
  return data;
};

export { getCsvForProjects };
