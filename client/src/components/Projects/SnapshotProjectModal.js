import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

import Button from "../Button/Button";
import { MdCameraAlt } from "react-icons/md";
import ModalDialog from "../UI/AriaModal/ModalDialog";

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
  camera: {
    marginBottom: "-5px"
  }
}));

export default function SnapshotProjectModal({
  mounted,
  onClose,
  selectedProjectName
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [snapshotProjectName, setSnapshotProjectName] = useState(
    `${selectedProjectName}`
  );

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
        <MdCameraAlt className={classes.camera} /> Convert &quot;
        {`${selectedProjectName}`}&quot; Into a Snapshot?
      </div>
      <div style={theme.typography.subHeading}>
        Once converted, this project draft will no longer be in an editable
        state.
      </div>
      <div style={{ margin: "1.5rem 2.5rem 1.5rem 0.75rem" }}>
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
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          className={classes.buttonColor}
          onClick={() => onClose("ok", snapshotProjectName)}
          variant="contained"
        >
          Done
        </Button>
      </div>
    </ModalDialog>
  );
}

SnapshotProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProjectName: PropTypes.string
};
