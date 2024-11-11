import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { IoMdCheckmarkCircle } from "react-icons/io";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  buttonColor: {
    backgroundColor: "#eaeff2"
  },
  circleCheck: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    width: "80px",
    height: "80px",
    color: "green"
  }
}));

export default function SubmitSnapshotModal({ mounted, onClose }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#cancelButton"
    >
      <>
        <div style={{ textAlign: "center" }}>
          <IoMdCheckmarkCircle className={classes.circleCheck} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center"
          }}
        >
          <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
            Ready for your submission!
          </div>
          <div style={theme.typography.subHeading}>
            Are you sure you want to submit the Snapshot?
          </div>
        </div>
      </>

      <div className={classes.buttonFlexBox} style={{ marginTop: "1.5rem" }}>
        <Button onClick={() => onClose("ok")} variant="contained">
          OK
        </Button>
        <Button onClick={onClose} variant="contained" id="cancelButton">
          {" "}
          Cancel
        </Button>
      </div>
    </ModalDialog>
  );
}

SubmitSnapshotModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func
};
