import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import WarningIcon from "../../images/warning-icon.png";
import { createUseStyles } from "react-jss";
import { MdDelete } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  modalHeader: theme.typography.heading1,
  modalSubHeader: theme.typography.subHeading,
  instruction: {
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "center",
    color: "#B64E38",
    "& span": {
      fontStyle: "italic"
    }
  },
  warningIcon: {
    margin: "0 10px"
  }
}));

const DeleteFaqModal = ({ isModalOpen, closeModal, handleDelete, isFaq }) => {
  const classes = useStyles();
  const type = isFaq ? "FAQ" : "Category";
  return (
    <ModalDialog mounted={isModalOpen} onClose={closeModal}>
      <div className={classes.modalHeader} style={{ marginBottom: "1.5rem" }}>
        <MdDelete />
        {` Delete ${type}`}
      </div>
      <div className={classes.modalSubHeader}>
        <img src={WarningIcon} className={classes.warningIcon} alt="Warning" />
        {`Are you sure you want to permanently delete the ${type}?`}
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={closeModal} variant="text" id="cancelButton">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color={"colorError"}>
          Delete
        </Button>
      </div>
    </ModalDialog>
  );
};

DeleteFaqModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
  isFaq: PropTypes.bool
};

export default DeleteFaqModal;
