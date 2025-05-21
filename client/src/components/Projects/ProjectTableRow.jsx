import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  MdVisibility,
  MdVisibilityOff,
  MdMoreVert,
  MdAdd,
  MdOutlineStickyNote2
} from "react-icons/md";
import { formatDate } from "../../helpers/util";
import { useReactToPrint } from "react-to-print";
import ProjectContextMenu from "./ProjectContextMenu";
import PdfPrint from "../PdfPrint/PdfPrint";
import fetchEngineRules from "./fetchEngineRules";
import * as droService from "../../services/dro.service";
import UniversalSelect from "../UI/UniversalSelect";
import { ENABLE_UPDATE_TOTALS } from "../../helpers/Constants";
import AdminNotesModal from "../Modals/ActionProjectAdminNotes";
import WarningModal from "../Modals/WarningAdminNotesUnsavedChanges";

const useStyles = createUseStyles(theme => ({
  td: {
    padding: "0.2em",
    textAlign: "left",
    width: "5%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    backgroundColor: theme.colorWhite,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  popover: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    boxShadow:
      "10px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
  }
}));

function useAdminNotesModal(project, onAdminNoteUpdate) {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewNote, setIsNewNote] = useState(
    !project.adminNotes || project.adminNotes == ""
  );
  const [adminNotes, setAdminNotes] = useState(project.adminNotes || "");
  const [adminNotesModalOpen, setAdminNotesModalOpen] = useState(false);

  const handleAdminNotesModalOpen = () => {
    setAdminNotesModalOpen(true);
  };

  const textUpdated = () => {
    return adminNotes !== (project?.adminNotes || "");
  };

  const handleCancel = () => {
    if (adminNotes !== (project?.adminNotes || "")) {
      // User would lose changes on cancel, so show warning modal
      setShowWarningModal(true);
    } else {
      setIsEditing(false);
      setAdminNotesModalOpen(false);
    }
  };

  useEffect(() => {
    setAdminNotes(project.adminNotes || "");
  }, [project.adminNotes]);

  const handleSave = () => {
    onAdminNoteUpdate(project.id, adminNotes);
    setIsEditing(false);
    setAdminNotesModalOpen(false);
    setIsNewNote(!adminNotes);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirmDiscard = () => {
    setIsEditing(false);
    setAdminNotes(project.adminNotes || "");
    setAdminNotesModalOpen(false);
    setShowWarningModal(false);
  };

  const handleDoNotDiscard = () => {
    setIsEditing(true);
    setShowWarningModal(false);
  };

  return {
    showWarningModal,
    setShowWarningModal,
    isEditing,
    isNewNote,
    adminNotes,
    setAdminNotes,
    adminNotesModalOpen,
    setAdminNotesModalOpen,
    handleAdminNotesModalOpen,
    handleCancel,
    handleSave,
    handleEdit,
    handleConfirmDiscard,
    handleDoNotDiscard,
    textUpdated
  };
}
/* eslint-disable no-unused-vars */
const ProjectTableRow = ({
  project,
  handleCsvModalOpen,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleRenameSnapshotModalOpen,
  handleShareSnapshotModalOpen,
  handleSubmitModalOpen,
  handleHide,
  handleCheckboxChange,
  checkedProjectIds,
  droOptions,
  onDroChange,
  onAdminNoteUpdate,
  isActiveProjectsTab
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);
  const loginId = userContext?.account?.id;
  const isAdmin = userContext?.account?.isAdmin || false;
  const {
    showWarningModal,
    setShowWarningModal,
    isEditing,
    isNewNote,
    adminNotes,
    setAdminNotes,
    adminNotesModalOpen,
    handleAdminNotesModalOpen,
    handleCancel,
    handleSave,
    handleEdit,
    handleConfirmDiscard,
    handleDoNotDiscard,
    textUpdated
  } = useAdminNotesModal(project, onAdminNoteUpdate);

  const formInputs = JSON.parse(project.formInputs);
  const printRef = useRef();
  const [projectRules, setProjectRules] = useState(null);
  const [selectedDro, setSelectedDro] = useState(project.droId || "");
  const [droName, setDroName] = useState("N/A");

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

  useEffect(() => {
    setSelectedDro(project.droId || "");
  }, [project.droId]);

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

  const daysUntilPermanentDeletion = () => {
    const diffDays =
      (new Date(project.dateTrashed).getTime() +
        90 * 24 * 60 * 60 * 1000 -
        Date.now()) /
      (1000 * 60 * 60 * 24);
    return diffDays >= 1 ? `${Math.floor(diffDays)} days` : "<1 day";
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
        {project.dateSnapshotted ? "Snapshot" : "Draft"}{" "}
        {project.dateTrashed ? (
          <span
            style={{
              color: daysUntilPermanentDeletion(project) <= 7 ? "red" : "gray"
            }}
          >
            ({daysUntilPermanentDeletion(project)})
          </span>
        ) : null}
      </td>
      <td className={classes.td}>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </td>
      <td className={classes.td}>{project.address}</td>
      <td className={classes.td}>{fallbackToBlank(formInputs.VERSION_NO)}</td>
      <td className={classes.td}>
        {`${project.lastName}, ${project.firstName}`}
      </td>
      <td className={classes.td}>{formatDate(project.dateCreated)}</td>
      <td className={classes.td}>
        <span>{formatDate(project.dateModified)}</span>
      </td>
      {!isActiveProjectsTab && (
        <td className={classes.td}>
          <span>{formatDate(project.dateTrashed)}</span>
        </td>
      )}
      <td className={classes.td}>{dateSubmittedDisplay()}</td>
      {/* DRO Column */}
      <td className={classes.td}>
        {/* Dro is editable if user is an admin OR user is the author and project is not submitted */}
        {droOptions.length > 0 &&
        (isAdmin || (project.loginId === loginId && !project.dateSubmitted)) ? (
          <div style={{ width: "100px" }}>
            <UniversalSelect
              value={selectedDro}
              onChange={e => {
                const newDroId = e.target.value;
                setSelectedDro(newDroId);
                onDroChange(project.id, newDroId);
              }}
              options={[
                { value: "", label: "Select..." },
                ...droOptions.map(dro => ({
                  value: dro.id,
                  label: dro.name
                }))
              ]}
              name="droId"
              className={classes.selectBox}
            />
          </div>
        ) : (
          <span>{droName}</span>
        )}
      </td>
      {isAdmin && (
        <div>
          <button
            onClick={handleAdminNotesModalOpen}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center"
            }}
            title={adminNotes ? "Edit Note" : "Add Note"}
          >
            {adminNotes ? <MdOutlineStickyNote2 /> : <MdAdd />}
          </button>
          <AdminNotesModal
            key="admin-notes-modal"
            mounted={adminNotesModalOpen}
            adminNotes={adminNotes}
            setAdminNotes={setAdminNotes}
            onCancel={handleCancel}
            onSave={handleSave}
            handleEdit={handleEdit}
            isEditing={isEditing}
            isNewNote={isNewNote}
            textUpdated={textUpdated}
          />
        </div>
      )}
      {isAdmin && (
        <WarningModal
          key="warning-modal"
          mounted={showWarningModal}
          handleConfirmDiscard={handleConfirmDiscard}
          handleDoNotDiscard={handleDoNotDiscard}
        />
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
              className={classes.popover}
              trigger={
                <button aria-label="context menu button">
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
                  handleShareSnapshotModalOpen={handleShareSnapshotModalOpen}
                  handleSubmitModalOpen={handleSubmitModalOpen}
                  handleHide={handleHide}
                />
              )}
            </Popup>
            <div style={{ display: "none" }}>
              <PdfPrint ref={printRef} rules={projectRules} project={project} />
            </div>
          </div>
        )}
      </td>{" "}
      {ENABLE_UPDATE_TOTALS ? (
        <td className={classes.td}>
          <span>{`${project.targetPoints}/${project.earnedPoints}/${project.projectLevel}`}</span>
        </td>
      ) : null}
    </tr>
  );
};
/* eslint-enable no-unused-vars */

ProjectTableRow.propTypes = {
  project: PropTypes.any,
  handleCsvModalOpen: PropTypes.func.isRequired,
  handleCopyModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  handleSnapshotModalOpen: PropTypes.func.isRequired,
  handleRenameSnapshotModalOpen: PropTypes.func.isRequired,
  handleShareSnapshotModalOpen: PropTypes.func.isRequired,
  handleSubmitModalOpen: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkedProjectIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  droOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onDroChange: PropTypes.func.isRequired,
  onAdminNoteUpdate: PropTypes.func.isRequired,
  isActiveProjectsTab: PropTypes.bool.isRequired
};

export default ProjectTableRow;
