import React from "react";
import Modal from "react-modal";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import CloseIcon from "../../images/close.png";
import { PropTypes } from "prop-types";
import CopyIcon from "../../images/copy.png";
import DeleteIcon from "../../images/trash.png";

const useStyles = createUseStyles({
  title: {
    fontSize: "25px",
    lineHeight: "31px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px"
  },
  titleIcon: {
    margin: "0 6px 0 0",
    verticalAlign: "middle"
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "42px"
  },
  closeBtn: {
    position: "absolute",
    top: "24px",
    right: "24px",
    backgroundColor: "transparent",
    border: "none"
  }
});

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    position: "relative",
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
    boxSizing: "border-box",
    maxHeight: "480px",
    width: "666px",
    maxWidth: "100%",
    padding: "60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)"
  }
};

const ProjectActionModal = ({
  isOpen,
  onRequestClose,
  contentLabel,
  toggleCloseButton,
  action,
  title,
  handleSubmit,
  submitButtonLabel,
  children
}) => {
  const classes = useStyles();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={modalStyles}
      shouldFocusAfterRender={false}
    >
      <button className={classes.closeBtn} onClick={toggleCloseButton}>
        <img src={CloseIcon} alt="Close" />
      </button>
      <h2 className={classes.title}>
        <img
          src={action === "duplicate" ? CopyIcon : DeleteIcon}
          alt={action}
          className={classes.titleIcon}
        />
        <strong>{title}</strong>
      </h2>

      {children}

      <div className={classes.modalActions}>
        <Button onClick={toggleCloseButton} variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={action === "duplicate" ? "colorPrimary" : "colorError"}
        >
          {submitButtonLabel}
        </Button>
      </div>
    </Modal>
  );
};

ProjectActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
  toggleCloseButton: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

// Required to bind modal to our appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default ProjectActionModal;
