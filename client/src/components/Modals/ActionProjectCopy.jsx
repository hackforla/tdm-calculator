import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../Button/Button";
import { MdFileCopy } from "react-icons/md";
import ModalDialog from "../UI/Modal";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30rem"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  icon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle"
  }
}));

export default function CopyProjectModal({
  mounted,
  onClose,
  selectedProjectName
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [duplicateProjectName, setDuplicateProjectName] = useState(
    `${selectedProjectName} (COPY)`
  );

  useEffect(() => {
    setDuplicateProjectName(`${selectedProjectName} (COPY)`);
  }, [selectedProjectName]);

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <div className={classes.container}>
        <div className={classes.heading1}>
          <MdFileCopy className={classes.icon} /> Duplicate Project
        </div>
        <div style={theme.typography.subHeading}>
          Type a new name to duplicate the project
        </div>
        <div style={theme.typography.heading3}>{selectedProjectName}</div>
        <div
          style={{ marginTop: "1.5rem", marginBottom: "1.5rem", width: "75%" }}
        >
          <input
            placeholder="Name of the duplicated project"
            type="text"
            id="duplicateName"
            name="duplicateName"
            value={duplicateProjectName}
            onChange={e => setDuplicateProjectName(e.target.value)}
            // autoFocus
            // onFocus={e => e.currentTarget.select()}
          />
        </div>
        <div className={classes.buttonFlexBox}>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => onClose("ok", duplicateProjectName)}
            variant="primary"
            disabled={!duplicateProjectName}
          >
            Create a Copy
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

CopyProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProjectName: PropTypes.string
};
