import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { MdWarning } from "react-icons/md";

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
  heading1: theme.typography.iconHeading1,
  text: { ...theme.typography.paragraph1, width: "3       0rem" }
}));

const AffordableEdgeCaseModal = ({ isOpen, onClose, onYes }) => {
  const classes = useStyles();
  return (
    <ModalDialog mounted={isOpen} onClose={onClose} omitCloseBox={true}>
      <div className={classes.container}>
        <div className={classes.modalHeader} style={{ marginBottom: "1.5rem" }}>
          <MdWarning className={classes.warningIcon} />
        </div>
        <h1 className={classes.heading1}>100% Affordable Housing</h1>
        <div className={classes.text}>
          {`100% affordable housing of less than 50 units are exempt from the TDM Ordinance. Did you intend to change to 100% Affordable Housing?`}
        </div>
        <div className={classes.buttonFlexBox}>
          <Button onClick={onClose} variant="secondary" id="cancelButton">
            NO
          </Button>
          <Button onClick={onYes} variant="warning" color={"colorPrimary"}>
            YES
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};

AffordableEdgeCaseModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onYes: PropTypes.func
};

export default AffordableEdgeCaseModal;
