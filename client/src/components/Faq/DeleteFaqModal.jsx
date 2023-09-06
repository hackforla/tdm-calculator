import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";

const DeleteFaqModal = ({ isModalOpen, closeModal, handleDelete }) => {
  return (
    <ModalDialog mounted={isModalOpen} underlayClickExits={false} omitCloseBox>
      <div>
        <p>Are you sure you would like to delete this?</p>
        <div className="buttonFlexBox">
          <Button variant="text" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="warning" type="submit" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};

DeleteFaqModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func
};

export default DeleteFaqModal;
