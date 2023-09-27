import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";

const SaveConfirmationModal = ({ isOpen, onClose, onYes }) => {
  return (
    <ModalDialog mounted={isOpen} underlayClickExits={false} omitCloseBox>
      <div>
        <p>Are you sure you want to save your changes?</p>
        <div className="buttonFlexBox">
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={onYes}>
            Yes
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};

SaveConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onYes: PropTypes.func
};

export default SaveConfirmationModal;
