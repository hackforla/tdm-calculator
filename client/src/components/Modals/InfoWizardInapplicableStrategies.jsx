import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import { createUseStyles, useTheme } from "react-jss";
import { MdInfo } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    height: "80px",
    width: "80px",
    color: theme.colorLADOT,
    marginBottom: "0",
    verticalAlign: "middle"
  },
  heading: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    marginTop: "1rem",
    marginBottom: "1rem",
    maxWidth: "30rem"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  }
}));

const InapplicableStrategiesModal = props => {
  const { inapplicableStrategiesModal, closeStrategiesModal } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ModalDialog
      mounted={inapplicableStrategiesModal}
      onClose={closeStrategiesModal}
      showCloseBox={true}
      escapeExits={false}
      underlayClickExits={false}
    >
      <div className={classes.container}>
        <MdInfo className={classes.icon} alt="Info" />
        <h1 className={classes.heading1}>Inapplicable Strategies</h1>
        <div className={classes.subheading}>
          Due to changes made to the project specifications, one or more TDM
          strategies are no longer applicable and have been automatically
          de-selected
        </div>
        <div className={classes.modalActions}>
          <Button
            variant="primary"
            id="modalProceed"
            data-testid="transitionProceed"
            onClick={closeStrategiesModal}
          >
            Okay, I Understand
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};

InapplicableStrategiesModal.propTypes = {
  inapplicableStrategiesModal: PropTypes.bool.isRequired,
  closeStrategiesModal: PropTypes.func
};

export default InapplicableStrategiesModal;
