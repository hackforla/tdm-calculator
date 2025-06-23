import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import { MdAdd, MdOutlineStickyNote2, MdCheck, MdEdit } from "react-icons/md";
import { formatDate } from "../../helpers/util";
import AdminNotesModal from "../Modals/ActionProjectAdminNotes";
import ActionManageSubmission from "../Modals/ActionManageSubmission";
import WarningModal from "../Modals/WarningAdminNotesUnsavedChanges";
import { Td, TdExpandable } from "./SubmissionTableData";

const useStyles = createUseStyles(theme => ({
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
  const [actionManageSubmissionOpen, setActionManageSubmissionOpen] =
    useState(false);

  const handleActionManageSubmissionOpen = () => {
    console.error(project);
    setActionManageSubmissionOpen(true);
  };

  const handleActionManageSubmissionClose = project => {
    if (project) {
      onStatusUpdate();
    }
    setActionManageSubmissionOpen(false);
  };

  return (
    <tr key={project.id}>
      <Td>
        <MdEdit onClick={handleActionManageSubmissionOpen} />
      </Td>
      <Td align="right">{project.id.toString().padStart(10, "0")}</Td>
      <TdExpandable>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </TdExpandable>
      <Td>{project.author}</Td>
      <td className={classes.tdCenterAlign}>{project.projectLevel}</td>
      <Td>{project.droName}</Td>
      <Td>{project.assignee}</Td>
      <Td>{formatDate(project.dateAssigned)}</Td>
      <Td>{project.invoiceStatusName}</Td>
      <Td>{formatDate(project.dateInvoicePaid)}</Td>
      <Td align="center">{project.onHold ? <MdCheck /> : ""}</Td>
      <Td>{project.approvalStatusName}</Td>
      <Td>
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
      </Td>
      <Td>{formatDate(project.dateCoO)}</Td>
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
