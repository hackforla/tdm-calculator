import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  MdVisibility,
  MdVisibilityOff,
  MdMoreVert,
  MdEdit,
  MdAddCircle
} from "react-icons/md";
import { formatDate } from "../../helpers/util";
import { useReactToPrint } from "react-to-print";
import ProjectContextMenu from "./ProjectContextMenu";
import PdfPrint from "../PdfPrint/PdfPrint";
import fetchEngineRules from "./fetchEngineRules";
import * as droService from "../../services/dro.service";
import UniversalSelect from "../UI/UniversalSelect";

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
  },

  selectBox: {
    padding: "0.5em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px"
  },
  adminNoteInput: {
    padding: "0.3em",
    marginRight: "0.5em",
    flexGrow: 1
  },
  saveButton: {
    padding: "0.3em 0.6em",
    marginRight: "0.3em",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:disabled": {
      backgroundColor: "#a5d6a7",
      cursor: "not-allowed"
    }
  },
  cancelButton: {
    padding: "0.3em 0.6em",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
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
  checkedProjectIds,
  isAdmin,
  droOptions,
  onDroChange, // New prop
  onAdminNoteUpdate // New prop
}) => {
  const classes = useStyles();
  const formInputs = JSON.parse(project.formInputs);
  const printRef = useRef();
  const [projectRules, setProjectRules] = useState(null);
  const [selectedDro, setSelectedDro] = useState(project.droId || "");
  const [droName, setDroName] = useState("N/A");
  const [editingNote, setEditingNote] = useState(false);
  const [adminNote, setAdminNote] = useState(project.adminNotes || "");
  const [tempAdminNote, setTempAdminNote] = useState(project.adminNotes || "");
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

  useEffect(() => {
    if (!isAdmin && project.droId) {
      const fetchDroById = async () => {
        try {
          const response = await droService.getById(project.droId);
          setDroName(response.data.name || "N/A");
        } catch (error) {
          console.error("Error fetching DRO by ID", error);
          setDroName("N/A");
        }
      };
      fetchDroById();
    }
  }, [isAdmin, project.droId]);

  const handleSave = () => {
    if (tempAdminNote.trim() !== adminNote.trim()) {
      onAdminNoteUpdate(project.id, tempAdminNote.trim());
    }
    setEditingNote(false);
  };

  const handleCancel = () => {
    setTempAdminNote(adminNote || "");
    setEditingNote(false);
  };

  useEffect(() => {
    setAdminNote(project.adminNotes || "");
  }, [project.adminNotes]);

  useEffect(() => {
    setSelectedDro(project.droId || "");
  }, [project.droId]);

  useEffect(() => {
    setTempAdminNote(project.adminNotes || "");
  }, [project.adminNotes]);

  const handlePrintPdf = useReactToPrint({
    content: () => printRef.current,
    bodyClass: "printContainer",
    pageStyle: ".printContainer {overflow: hidden;}"
  });

  const fallbackToBlank = value => {
    return value !== "undefined" ? value : "";
  };

  const dateSubmittedDisplay = () => {
    if (project.dateSubmitted) {
      return <span>{formatDate(project.dateSubmitted)}</span>;
    }
    return <span>{formatDate(project.dateSubmitted)}</span>;
  };

  return (
    <tr
      key={project.id}
      style={{ background: project.dateTrashed ? "#ffdcdc" : "" }}
    >
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
          <MdVisibilityOff
            alt={`Project Is Hidden`}
            title={`Project is hidden`}
            style={{ width: "2em" }}
          />
        ) : (
          <MdVisibility
            alt={`Project Is Visible`}
            title={`Project is visible`}
            style={{ width: "2em" }}
          />
        )}
      </td>
      <td className={classes.td}>
        {project.dateSnapshotted ? "Snapshot" : "Draft"}
        {project.dateTrashed ? <span> (deleted)</span> : null}
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
      <td className={classes.td}>
        <span>{formatDate(project.dateModified)}</span>
      </td>
      <td className={classes.td}>{dateSubmittedDisplay()}</td>
      {/* DRO Column */}
      <td className={classes.td}>
        {isAdmin && droOptions.data ? (
          <div style={{ width: "150px" }}>
            <UniversalSelect
              value={selectedDro}
              onChange={e => {
                const newDroId = e.target.value;
                setSelectedDro(newDroId);
                onDroChange(project.id, newDroId); // Use the passed-in handler
              }}
              options={droOptions.data.map(dro => ({
                value: dro.id,
                label: dro.name
              }))}
              name="droId"
              className={classes.selectBox}
            />
          </div>
        ) : (
          // Display the fetched DRO name for non-admin users
          <span>{droName}</span>
        )}
      </td>

      {isAdmin && (
        <td className={classes.tdCenterAlign}>
          <div>
            {editingNote ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={tempAdminNote}
                  onChange={e => setTempAdminNote(e.target.value)}
                  autoFocus
                  className={classes.adminNoteInput} // Optional: Add styling for better UX
                />
                <button
                  onClick={handleSave}
                  className={classes.saveButton}
                  disabled={tempAdminNote.trim() === ""}
                  title="Save Note"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className={classes.cancelButton}
                  title="Cancel"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {adminNote && <span>{adminNote}</span>}
                <button
                  onClick={() => {
                    setEditingNote(true);
                    setTempAdminNote(adminNote || "");
                  }}
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center"
                  }}
                  title="Edit Note"
                >
                  {adminNote ? <MdEdit /> : <MdAddCircle />}
                </button>
              </div>
            )}
          </div>
        </td>
      )}

      {isAdmin && (
        <td className={classes.td}>
          <span>
            {project.dateModifiedAdmin
              ? formatDate(project.dateModifiedAdmin)
              : "N/A"}
          </span>
        </td>
      )}
      <td className={classes.actionIcons}>
        {projectRules && (
          <div>
            <Popup
              trigger={
                <button>
                  <MdMoreVert alt={`Show project context menu`} />
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
  project: PropTypes.any,
  handleCsvModalOpen: PropTypes.func.isRequired,
  handleCopyModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  handleSnapshotModalOpen: PropTypes.func.isRequired,
  handleRenameSnapshotModalOpen: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkedProjectIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  droOptions: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    headers: PropTypes.object,
    find: PropTypes.func.isRequired
  }).isRequired,
  onDroChange: PropTypes.func.isRequired, // New propType
  onAdminNoteUpdate: PropTypes.func.isRequired // New propType
};

export default ProjectTableRow;
