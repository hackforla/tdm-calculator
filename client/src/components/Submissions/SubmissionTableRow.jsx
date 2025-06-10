import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import { MdAdd, MdOutlineStickyNote2, MdCheck, MdEdit } from "react-icons/md";
import { formatDate } from "../../helpers/util";
import AdminNotesModal from "../Modals/ActionProjectAdminNotes";
import ActionManageSubmission from "../Modals/ActionManageSubmission";
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

const SubmissionTableRow = ({
  project,
  onAdminNoteUpdate,
  assigneeList,
  onStatusUpdate
}) => {
  const {
    showWarningModal,
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
  const theme = useTheme();
  const classes = useStyles(theme);
  const navigate = useNavigate();
  const [actionManageSubmissionOpen, setActionManageSubmissionOpen] =
    useState(false);

  const handleActionManageSubmissionOpen = () => {
    setActionManageSubmissionOpen(true);
  };

  const handleEditSubmissionNavigate = () => {
    console.error(project);
    navigate(`/editsubmission/${project.id}`);
  };

  const handleActionManageSubmissionClose = project => {
    if (project) {
      onStatusUpdate();
    }
    setActionManageSubmissionOpen(false);
  };

  return (
    <tr key={project.id}>
      <td className={classes.td}>
        <MdEdit onClick={handleActionManageSubmissionOpen} />
      </td>
      <td className={classes.td}>
        <MdEdit onClick={handleEditSubmissionNavigate} />
      </td>

      <td className={classes.tdRightAlign}>
        {project.id.toString().padStart(10, "0")}
      </td>
      <td className={classes.td}>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </td>
      <td className={classes.td}>{project.author}</td>
      <td className={classes.tdCenterAlign}>{project.projectLevel}</td>
      <td className={classes.td}>{project.droName}</td>
      <td className={classes.td}>{project.assignee}</td>
      <td className={classes.td}>{formatDate(project.dateAssigned)}</td>
      <td className={classes.td}>{project.invoiceStatusName}</td>
      <td className={classes.td}>{formatDate(project.dateInvoicePaid)}</td>
      <td className={classes.tdCenterAlign}>
        {project.onHold ? <MdCheck /> : ""}
      </td>
      <td className={classes.td}>{project.approvalStatusName}</td>
      <td className={classes.td}>
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
      </td>
      <td className={classes.td}>{formatDate(project.dateCoO)}</td>
      <WarningModal
        key="warning-modal"
        mounted={showWarningModal}
        handleConfirmDiscard={handleConfirmDiscard}
        handleDoNotDiscard={handleDoNotDiscard}
      />
      <ActionManageSubmission
        key={project.id}
        mounted={actionManageSubmissionOpen}
        onClose={handleActionManageSubmissionClose}
        project={project}
        assigneeList={assigneeList}
      />
    </tr>
  );
};

SubmissionTableRow.propTypes = {
  project: PropTypes.any,
  onAdminNoteUpdate: PropTypes.func.isRequired,
  assigneeList: PropTypes.array,
  onStatusUpdate: PropTypes.func
};

export default SubmissionTableRow;
