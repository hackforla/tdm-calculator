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
import pdfCsvData from "./pdfCsvData";

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

const ProjectTableRow = ({
  project,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleRenameSnapshotModalOpen,
  handleHide
}) => {
  const classes = useStyles();
  const momentModified = moment(project.dateModified);
  const formInputs = JSON.parse(project.formInputs);

  const csvRef = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
  const printRef = useRef();

  const [projectData, setProjectData] = useState();

  // Download and process rules once for both CSV and PDF rendering
  useEffect(() => {
    const fetchRules = async () => {
      const arrRules = await pdfCsvData(project);
      const rules = arrRules.rules;
      const csvData = arrRules.csvData;

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
                  handleRenameSnapshotModalOpen={handleRenameSnapshotModalOpen}
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
  handleRenameSnapshotModalOpen: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired
};

export default ProjectTableRow;
