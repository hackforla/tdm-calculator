import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
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
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "1rem",
    marginBottom: "1rem"
  }
}));

export default function WarningTargetNotReached({ mounted, onClose }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      escapeExits={false}
      initialFocus="#cancelButton"
      underlayClickExits={false}
    >
      <div className={classes.container}>
        <MdInfo alt="Warning" className={classes.icon} />
        <div className={classes.heading1}>
          You have not reached the target points.
        </div>
        <div className={classes.subheading}>
          Since your project has not reached the target points, you cannot
          submit this project. Please go back and select enough strategies to
          meet the target points and create a new snapshot to submit, or contact
          a LADOT planner for assistance.
        </div>
      </div>
      <div className={classes.buttonFlexBox} style={{ marginTop: "1.5rem" }}>
        <Button onClick={() => onClose("ok")} variant="primary">
          Okay, I Understand
        </Button>
      </div>
    </ModalDialog>
  );
}

WarningTargetNotReached.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func
};
