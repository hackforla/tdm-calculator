import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

import Button from "../Button/Button";
import { MdCameraAlt } from "react-icons/md";
import ModalDialog from "../UI/Modal";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "30rem",
    margin: "0 2rem"
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
    marginBottom: "1rem",
    textAlign: "center"
  },
  icon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle"
  }
}));

export default function SnapshotProjectModal({
  mounted,
  onClose,
  selectedProjectName
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [snapshotProjectName, setSnapshotProjectName] = useState("");

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <div className={classes.container}>
        <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
          <MdCameraAlt className={classes.icon} /> Convert &quot;
          {selectedProjectName}&quot; Into a Snapshot
        </div>
        <div className={classes.subheading}>
          Once converted, this project draft will no longer be in an editable
          state
        </div>
        <div className={classes.subheading} style={{ width: "75%" }}>
          <input
            placeholder="Name of the Snapshot"
            type="text"
            id="duplicateName"
            name="duplicateName"
            value={snapshotProjectName}
            onChange={e => setSnapshotProjectName(e.target.value)}
          />
        </div>
        <div className={classes.buttonFlexBox}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onClose("ok", snapshotProjectName)}
            variant="primary"
            disabled={!snapshotProjectName}
          >
            Proceed
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

SnapshotProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProjectName: PropTypes.string
};
