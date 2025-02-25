import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../Button/Button";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import { MdCameraAlt } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  icon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle"
  }
}));

export default function RenameSnapshotModal({
  mounted,
  onClose,
  selectedProjectName
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [snapshotProjectName, setSnapshotProjectName] =
    useState(selectedProjectName);

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <div className={classes.container}>
        <div className={classes.heading1}>
          <MdCameraAlt className={classes.icon} />
          Rename Snapshot
        </div>
        <div className={classes.subheading}>
          Enter a new name for your snapshot
        </div>
        <div className={classes.subheading} style={{ width: "75%" }}>
          <input
            placeholder="Name of Duplicated Project"
            type="text"
            id="duplicateName"
            name="duplicateName"
            value={snapshotProjectName}
            onChange={e => setSnapshotProjectName(e.target.value)}
          />
        </div>
        <div className={classes.buttonFlexBox}>
          <Button
            className={classes.buttonColor}
            onClick={onClose}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onClose("ok", snapshotProjectName)}
            variant="primary"
          >
            Done
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

RenameSnapshotModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProjectName: PropTypes.string
};
