import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdFileCopy } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    maxWidth: "23rem",
    margin: "0 auto"
  },
  description: {
    fontWeight: 500,
    fontSize: "1.2rem"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    color: theme.colorBlack
    // verticalAlign: "middle"
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    marginBottom: "1rem"
  },
  dialogContainer: {
    backgroundColor: "red",
    minWidth: 0
  }
}));

export default function CopyAndEditSnapshotModal({
  mounted,
  onClose,
  isSnapshotOwner,
  copyAndEditSnapshot,
  projectName
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [newProjectId, setNewProjectId] = useState(null);

  const props = {
    onClose,
    isSnapshotOwner,
    copyAndEditSnapshot,
    setHasSubmitted,
    projectName,
    newProjectId,
    setNewProjectId
  };

  const handleClose = () => {
    setHasSubmitted(false);
    onClose();
  };

  return (
    <ModalDialog
      mounted={mounted}
      onClose={handleClose}
      contentClass={classes.container}
      title="Copy and Edit Snapshot"
      // style={{ background: "red" }}
      // initialFocus="#copyAndEditSnapshot"
    >
      {!hasSubmitted ? (
        <CreateCopyOfSnapshot {...props} />
      ) : (
        <ProjectRedirect {...props} />
      )}
    </ModalDialog>
  );
}

function CreateCopyOfSnapshot({
  isSnapshotOwner,
  copyAndEditSnapshot,
  setHasSubmitted,
  onClose,
  projectName,
  setNewProjectId
}) {
  const [newSnapshotName, setNewSnapshotName] = useState(
    `Copy of ${projectName}`
  );
  const theme = useTheme();
  const classes = useStyles({ theme });

  const handleSubmitCopy = async () => {
    const projectId = await copyAndEditSnapshot(newSnapshotName);
    setNewProjectId(projectId);
    setHasSubmitted(true);
  };

  return (
    <div className={classes.container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MdFileCopy className={classes.icon} />
        <h2 className={classes.heading1}>Create Editable Copy</h2>
      </div>
      <div>
        <p className={classes.description}>
          {isSnapshotOwner
            ? `This snapshot cannot be edited. Create a copy of the project to edit.`
            : `You are looking at a project snapshot that has been shared with you. To save it to your "My Projects" page, create a copy of this project, which you can view and edit.`}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="copyAndEditSnapshot">
            Rename the copy (optional).
          </label>
          <input
            type="text"
            id="copyAndEditSnapshot"
            name="copyAndEditSnapshot"
            placeholder="Enter a name for the new snapshot"
            autoFocus
            value={newSnapshotName}
            onChange={e => setNewSnapshotName(e.target.value)}
            style={{ width: "90%" }}
          />
        </div>
        <div className={classes.buttonFlexBox}>
          <Button
            onClick={onClose}
            color="colorDisabled"
            variant="download"
            style={{ backgroundColor: "blue" }}
          >
            No, Cancel
          </Button>
          <Button
            onClick={() => handleSubmitCopy()}
            variant="primary"
            style={{ marginRight: "1rem" }}
          >
            Create a copy
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectRedirect({ onClose, setHasSubmitted, newProjectId }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const navigate = useNavigate();

  const handleClose = page => {
    const pagePath = {
      myProjects: "/projects",
      editProject: `/calculation/1/${newProjectId}`
    };

    setHasSubmitted(false);
    navigate(pagePath[page], { replace: true });
    onClose();
  };

  return (
    <div className={classes.container} style={{ maxWidth: "30rem" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MdFileCopy className={classes.icon} />
        <h2 className={classes.heading1}>Edit Project</h2>
      </div>
      <div>
        <p>View the “My Project” dashboard or edit the new copy</p>
      </div>
      <div className={classes.buttonFlexBox}>
        <Button
          onClick={() => handleClose("myProjects")}
          color="colorDisabled"
          variant="download"
        >
          My Projects
        </Button>
        <Button
          onClick={() => handleClose("editProject")}
          variant="primary"
          style={{ marginRight: "1rem" }}
        >
          Edit Project Copy
        </Button>
      </div>
    </div>
  );
}

CopyAndEditSnapshotModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  isSnapshotOwner: PropTypes.bool,
  copyAndEditSnapshot: PropTypes.func,
  projectName: PropTypes.string
};

CreateCopyOfSnapshot.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  isSnapshotOwner: PropTypes.bool,
  copyAndEditSnapshot: PropTypes.func,
  setHasSubmitted: PropTypes.func,
  projectName: PropTypes.string,
  setNewProjectId: PropTypes.func
};

ProjectRedirect.propTypes = {
  onClose: PropTypes.func,
  setHasSubmitted: PropTypes.func,
  newProjectId: PropTypes.number
};
