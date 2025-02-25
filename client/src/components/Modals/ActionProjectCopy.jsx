import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../Button/Button";
import { MdFileCopy } from "react-icons/md";
import ModalDialog from "../UI/AriaModal/ModalDialog";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1
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
      <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
        <MdFileCopy /> Duplicate Project
      </div>
      <div style={theme.typography.subHeading}>
        Type a new name to duplicate the project
      </div>
      <div style={theme.typography.heading3}>{`${selectedProjectName}`}.</div>
      <div style={{ margin: "1.5rem 2.5rem 1.5rem 0.75rem" }}>
        <input
          placeholder="Name of the duplicated project"
          type="text"
          id="duplicateName"
          name="duplicateName"
          value={duplicateProjectName}
          onChange={e => setDuplicateProjectName(e.target.value)}
        />
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => onClose("ok", duplicateProjectName)}
          variant="contained"
          color={"colorPrimary"}
          disabled={!duplicateProjectName}
        >
          Create a Copy
        </Button>
      </div>
    </ModalDialog>
  );
}

CopyProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProjectName: PropTypes.string
};
