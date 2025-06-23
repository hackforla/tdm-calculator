import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import { MdAdd, MdOutlineStickyNote2, MdCheck, MdEdit } from "react-icons/md";
import { formatDate } from "../../helpers/util";
import AdminNotesModal from "../Modals/ActionProjectAdminNotes";
import ActionManageSubmission from "../Modals/ActionManageSubmission";
import WarningModal from "../Modals/WarningAdminNotesUnsavedChanges";
import { Td, TdExpandable } from "./SubmissionTableData";

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
      <Td align="center">{project.projectLevel}</Td>
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
