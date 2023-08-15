import React from "react";
import { withRouter } from "react-router-dom";
import ModalDialog from "../UI/ModalDialog/ModalDialog";
import PropTypes from "prop-types";
import ChecklistContent from "./ChecklistContent";

const ChecklistModal = ({ checklistModalOpen, toggleChecklistModal }) => {
  if (!checklistModalOpen) return null;

  return (
    <ModalDialog onClose={toggleChecklistModal}>
      <ChecklistContent />
    </ModalDialog>
  );
};

ChecklistModal.propTypes = {
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default withRouter(ChecklistModal);
