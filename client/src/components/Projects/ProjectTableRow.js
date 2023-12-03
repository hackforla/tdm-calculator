import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

import ProjectContextMenu from "./ProjectContextMenu";
import PdfPrint from "../PdfPrint/PdfPrint";
import fetchEngineRules from "./fetchEngineRules";

const useStyles = createUseStyles({
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  tdRightAlign: {
    padding: "0.2em",
    textAlign: "right"
  },
  tdCenterAlign: {
    padding: "0.2em",
    textAlign: "center"
  },
  actionIcons: {
    display: "flex",
    justifyContent: "space-around",
    width: "auto",
    "& button": {
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        cursor: "pointer"
      }
    }
  }
});

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
  const orderedRules = includeRuleCodes
    .map(rc => rules.find(r => r.code === rc))
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

  let columnData = orderedRules.concat(projectProperties);

  const ruleNames = columnData.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice => rule.name + " - " + choice.name);
    } else {
      return `${rule.name}${rule.units ? " (" + rule.units + ")" : ""}`;
    }
  });

  const ruleValues = columnData.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice => (choice.id == rule.value ? "Y" : "N"));
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

const ProjectTableRow = ({
  project,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleHide
}) => {
  const classes = useStyles();
  const momentModified = moment(project.dateModified);
  const formInputs = JSON.parse(project.formInputs);

  const csvRef = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
  const printRef = useRef();

  //   const [csvData, setCsvData] = useState([]);
  //   const [projectRules, setProjectRules] = useState();
  const [projectData, setProjectData] = useState();

  // Download and process rules once for both CSV and PDF rendering
  useEffect(() => {
    const fetchRules = async () => {
      const rules = await fetchEngineRules(project);
      const csvData = project && mapCsvRules(project, rules);
      console.error(rules);

      setProjectData({ pdf: rules, csv: csvData });
    };

    fetchRules()
      // TODO: do we have better reporting than this?
      .catch(console.error);
  }, [project]);

  const handleDownloadCsv = () => {
    csvRef.current.link.click();
  };

  const handlePrintPdf = useReactToPrint({
    content: () => printRef.current,
    bodyClass: "printContainer",
    pageStyle: ".printContainer {overflow: hidden;}"
  });

  const fallbackToBlank = value => {
    return value !== "undefined" ? value : "";
  };

  // Last Modified Date column should display the Last Modified date, unless the project is
  // deleted, in which case it will show the deleted date followed by "-Deleted" in red.
  const dateModifiedDisplay = () => {
    if (project.dateTrashed) {
      return (
        <span>
          {moment(project.dateTrashed).format("YYYY-MM-DD")}
          <span style={{ color: "red" }}>-Deleted</span>
        </span>
      );
    }
    return <span>{moment(project.dateModified).format("YYYY-MM-DD")}</span>;
  };

  return (
    <tr key={project.id}>
      <td className={classes.tdCenterAlign}>
        {project.dateHidden ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            alt={`Project Is Hidden`}
            title={`Project is hidden`}
            style={{ width: "2em" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            alt={`Project Is Visible`}
            title={`Project is visible`}
            style={{ width: "2em" }}
          />
        )}
      </td>
      <td className={classes.td}>
        {project.dateSnapshotted ? "Snapshot" : "Draft"}
      </td>
      <td className={classes.td}>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </td>
      <td className={classes.td}>{project.address}</td>
      <td className={classes.td}>{fallbackToBlank(formInputs.VERSION_NO)}</td>
      <td
        className={classes.td}
      >{`${project.firstName} ${project.lastName}`}</td>
      <td className={classes.tdRightAlign}>
        {moment(project.dateCreated).format("YYYY-MM-DD")}
      </td>

      <td className={classes.td}>{dateModifiedDisplay()}</td>

      <td className={classes.actionIcons}>
        {projectData && (
          <div>
            <Popup
              trigger={
                <button>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    alt={`Show project context menu`}
                  />
                </button>
              }
              position="left center"
              offsetX={-10}
              on="hover"
              arrow={true}
            >
              {close => (
                <ProjectContextMenu
                  project={project}
                  closeMenu={close}
                  handleCopyModalOpen={handleCopyModalOpen}
                  handleDeleteModalOpen={handleDeleteModalOpen}
                  handleDownloadCsv={handleDownloadCsv}
                  handlePrintPdf={handlePrintPdf}
                  handleSnapshotModalOpen={handleSnapshotModalOpen}
                  handleHide={handleHide}
                />
              )}
            </Popup>
            <div style={{ display: "none" }}>
              <CSVLink
                data={projectData.csv}
                filename={"TDM-data.csv"}
                ref={csvRef}
                target="_blank"
              />
              <PdfPrint
                ref={printRef}
                rules={projectData.pdf}
                dateModified={momentModified.format("MM/DD/YYYY")}
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

ProjectTableRow.propTypes = {
  project: PropTypes.object.isRequired,
  handleCopyModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  handleSnapshotModalOpen: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired
};

export default ProjectTableRow;
