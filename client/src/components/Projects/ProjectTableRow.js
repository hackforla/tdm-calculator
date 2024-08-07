import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../helpers/util";
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

const ProjectTableRow = ({
  project,
  handleCsvModalOpen,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleRenameSnapshotModalOpen,
  handleHide,
  handleCheckboxChange,
  checkedProjectIds
}) => {
  const classes = useStyles();
  const formInputs = JSON.parse(project.formInputs);
  const printRef = useRef();

  const [projectRules, setProjectRules] = useState(null);

  // Download and process rules for PDF rendering
  useEffect(() => {
    const fetchRules = async () => {
      const result = await fetchEngineRules(project);
      setProjectRules(result);
    };

    fetchRules()
      // TODO: do we have better reporting than this?
      .catch(console.error);
  }, [project]);

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
          {formatDate(project.dateTrashed)}
          <span style={{ color: "red" }}>-Deleted</span>
        </span>
      );
    }

    return <span>{formatDate(project.dateModified)}</span>;
  };

  const dateSubmittedDisplay = () => {
    if (project.dateSubmitted) {
      return <span>{formatDate(project.dateSubmitted)}</span>;
    }
    return <span>{formatDate(project.dateSubmitted)}</span>;
  };

  return (
    <tr key={project.id}>
      <td className={classes.tdCenterAlign}>
        <input
          style={{ height: "15px" }}
          type="checkbox"
          checked={checkedProjectIds.includes(project.id)}
          onChange={() => handleCheckboxChange(project.id)}
        />
      </td>
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
      <td className={classes.td}>
        {`${project.firstName} ${project.lastName}`}
      </td>
      <td className={classes.tdRightAlign}>
        {formatDate(project.dateCreated)}
      </td>

      <td className={classes.td}>{dateModifiedDisplay()}</td>
      <td className={classes.td}>{dateSubmittedDisplay()}</td>

      <td className={classes.actionIcons}>
        {projectRules && (
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
                  handleCsvModalOpen={ev => handleCsvModalOpen(ev, project)}
                  handleCopyModalOpen={handleCopyModalOpen}
                  handleDeleteModalOpen={handleDeleteModalOpen}
                  handlePrintPdf={handlePrintPdf}
                  handleSnapshotModalOpen={handleSnapshotModalOpen}
                  handleRenameSnapshotModalOpen={handleRenameSnapshotModalOpen}
                  handleHide={handleHide}
                />
              )}
            </Popup>
            <div style={{ display: "none" }}>
              <PdfPrint ref={printRef} rules={projectRules} project={project} />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

ProjectTableRow.propTypes = {
  project: PropTypes.object.isRequired,
  handleCsvModalOpen: PropTypes.func.isRequired,
  handleCopyModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  handleSnapshotModalOpen: PropTypes.func.isRequired,
  handleRenameSnapshotModalOpen: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkedProjectIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default ProjectTableRow;
