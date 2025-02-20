import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  warningIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorCritical,
    textAlign: "center"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  modalHeader: theme.typography.heading1,
  modalSubHeader: {
    ...theme.typography.subHeading,
    marginTop: "1rem",
    marginBottom: "1rem"
  }
}));

const DeleteFaqModal = ({ isModalOpen, closeModal, handleDelete, isFaq }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const type = isFaq ? "FAQ" : "Category";
  return (
    <ModalDialog mounted={isModalOpen} onClose={closeModal} omitCloseBox={true}>
      <div className={classes.container}>
        <MdWarning alt="Warning" className={classes.warningIcon} />
        <div className={classes.modalHeader}>{` Delete ${type}`}</div>
        <div className={classes.modalSubHeader}>
          {`Are you sure you want to permanently delete the ${type}?`}
        </div>
        <div className={classes.buttonFlexBox}>
          <Button onClick={closeModal} variant="secondary" id="cancelButton">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="warning">
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
  handleDelete: PropTypes.func,
  isFaq: PropTypes.bool
};

export default DeleteFaqModal;
