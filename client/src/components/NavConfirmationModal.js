import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "./Button/Button";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "100"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    padding: "60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)"
  }
};
const NavConfirmationModal = ({
  setOpenNavModal,
  openNavModal,
  confirmCallback
}) => {
  function allowTransition() {
    setOpenNavModal(false);
    confirmCallback(true);
  }

  function blockTransition() {
    setOpenNavModal(false);
    confirmCallback(false);
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={openNavModal}
        onRequestClose={() => setOpenNavModal(false)}
        contentLabel="Navigation Confirmation"
        style={modalStyles}
      >
        <h2>Are you sure you want to navigate away?</h2>
        <h4>Your data will not be saved.</h4>
        <br />
        <div>
          <Button variant="outlined" onClick={blockTransition}>
            Cancel
          </Button>
          <Button color="colorPrimary" onClick={allowTransition}>
            Proceed
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

NavConfirmationModal.propTypes = {
  setOpenNavModal: PropTypes.func.isRequired,
  confirmCallback: PropTypes.func,
  openNavModal: PropTypes.bool.isRequired
};

export default NavConfirmationModal;
