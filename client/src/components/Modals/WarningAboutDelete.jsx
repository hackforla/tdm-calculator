import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
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
  modalHeader: theme.typography.iconHeading1,
  modalSubHeader: {
    ...theme.typography.subHeading,
    marginTop: "1rem",
    marginBottom: "1rem"
  }
}));

const DeleteAboutItemModal = ({ isModalOpen, cancel, handleDelete }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ModalDialog mounted={isModalOpen} onClose={cancel} omitCloseBox={true}>
      <div className={classes.container}>
        <MdWarning alt="Warning" className={classes.warningIcon} />
        <div className={classes.modalHeader}>{` Delete About Section`}</div>
        <div className={classes.modalSubHeader}>
          {"Are you sure you want to permanently delete the about section?"}
          <p>
            If this section has been saved, you can undo this action by
            canceling changes at the top of the page
          </p>
        </div>
        <div className={classes.buttonFlexBox}>
          <Button onClick={cancel} variant="secondary" id="cancelButton">
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

DeleteAboutItemModal.propTypes = {
  isModalOpen: PropTypes.bool,
  cancel: PropTypes.func,
  handleDelete: PropTypes.func
};

export default DeleteAboutItemModal;
