import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { MdError } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  container: {
    width: "80%",
    maxWidth: "35rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: 0
  },
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
  }
}));

const AffordableEdgeCaseModal = ({ isOpen, onClose, onYes }) => {
  const classes = useStyles();
  return (
    <ModalDialog mounted={isOpen} onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.modalHeader} style={{ marginBottom: "1.5rem" }}>
          <MdError
            style={{
              marginBottom: "-5px",
              color: "#C35302",
              height: "80px",
              width: "5rem"
            }}
          />
        </div>
        <div className={classes.modalSubHeader}>
          {`100% affordable housing of less than 50 units are exempt from the TDM Ordinance. Did you intend to change to 100% Affordable Housing?`}
        </div>
        <div className={classes.buttonFlexBox}>
          <Button onClick={onClose} variant="text" id="cancelButton">
            NO
          </Button>
          <Button onClick={onYes} variant="contained" color={"colorPrimary"}>
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
