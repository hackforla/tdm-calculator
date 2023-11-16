import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faTrash,
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

const mapCsvRules = rules => {
  //  TODO: consider merging project meta data with rules values
  const usedRules = rules.filter(rule => rule.used && rule.value);

  // TODO: decide about using code or name for the header (or keep both)
  const ruleCodes = usedRules.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice => rule.code + "_" + choice.id);
    } else {
      return rule.code;
    }
  });
  const ruleNames = usedRules.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice => rule.name + " - " + choice.name);
    } else {
      return rule.name;
    }
  });
  const ruleValues = usedRules.flatMap(rule => {
    if (rule.dataType === "choice") {
      return rule.choices.map(choice => (choice.id == rule.value ? "Y" : "N"));
    } else {
      return rule.value.toString();
    }
  });

  const flat = [
    ["TDM Calculation Project Summary"],
    ["Date Printed: " + Date().toString()], // TODO: prefer ISO string?
    [],
    ruleNames,
    ruleCodes,
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
      const csvData = mapCsvRules(rules || []);

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
    content: () => printRef.current
  });

  const fallbackToBlank = value => {
    return value !== "undefined" ? value : "";
  };

  return (
    <tr key={project.id}>
      <td className={classes.td}>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </td>
      <td className={classes.td}>{project.address}</td>
      <td className={classes.td}>{fallbackToBlank(formInputs.VERSION_NO)}</td>
      <td className={classes.td}>
        {fallbackToBlank(formInputs.BUILDING_PERMIT)}
      </td>
      <td
        className={classes.td}
      >{`${project.firstName} ${project.lastName}`}</td>
      <td className={classes.tdRightAlign}>
        {moment(project.dateCreated).format("MM/DD/YYYY")}
      </td>
      <td className={classes.tdRightAlign}>
        {momentModified.isSame(moment(), "day")
          ? momentModified.format("h:mm A")
          : momentModified.format("MM/DD/YYYY")}
      </td>
      <td className={classes.tdRightAlign}>
        {project.dateHidden && (
          <FontAwesomeIcon
            icon={faEyeSlash}
            alt={`Project Is Hidden`}
            title={`Project is hidden`}
          />
        )}
      </td>
      <td className={classes.tdRightAlign}>
        {project.dateTrashed && (
          <FontAwesomeIcon
            icon={faTrash}
            alt={`Project Is In Trash`}
            title={`Project is in trash`}
          />
        )}
      </td>
      <td className={classes.tdRightAlign}>
        {project.dateSnapshotted && (
          <FontAwesomeIcon
            icon={faCamera}
            alt={`Project Is A Snapshot`}
            title={`Project is a snapshot`}
          />
        )}
      </td>
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
              position="bottom center"
              offsetX={-100}
              on="click"
              closeOnDocumentClick
              arrow={false}
            >
              <ProjectContextMenu
                project={project}
                handleCopyModalOpen={handleCopyModalOpen}
                handleDeleteModalOpen={handleDeleteModalOpen}
                handleDownloadCsv={handleDownloadCsv}
                handlePrintPdf={handlePrintPdf}
                handleSnapshotModalOpen={handleSnapshotModalOpen}
                handleHide={handleHide}
              />
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
