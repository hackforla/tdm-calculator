import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { MdWarning } from "react-icons/md";

const useStyles = createUseStyles({
  title: {
    textAlign: "center"
  },
  deselectedWrapper: {
    textAlign: "center"
  },
  deselectedAlign: {
    lineHeight: "40px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  }
});
const InapplicableStrategiesModal = props => {
  const { inapplicableStrategiesModal, closeStrategiesModal } = props;
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={inapplicableStrategiesModal}
      onClose={closeStrategiesModal}
      showCloseBox={false}
      escapeExits={false}
      underlayClickExits={false}
    >
      <div className={classes.deselectedWrapper}>
        <MdWarning style={{ color: "#E46247", height: "80px" }} alt="Warning" />
        <h2 className={classes.deselectedAlign}>
          Due to changes made to the project specifications, one or more TDM
          strategies are no longer applicable and have been automatically
          de-selected
        </h2>
      </div>
      <div className={classes.modalActions}>
        <Button
          color="colorDeselect"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={closeStrategiesModal}
        >
          Okay, I Understand
        </Button>
      </div>
    </ModalDialog>
  );
};

InapplicableStrategiesModal.propTypes = {
  inapplicableStrategiesModal: PropTypes.bool.isRequired,
  closeStrategiesModal: PropTypes.func
};

export default InapplicableStrategiesModal;
