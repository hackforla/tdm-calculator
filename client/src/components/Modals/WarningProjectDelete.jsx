import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import * as projectShareService from "../../services/projectShare.service";

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
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem"
  },
  collaboratorSection: {
    width: "30rem",
    margin: "1.5rem 0"
  },
  collaboratorHeading: {
    ...theme.typography.heading3,
    marginBottom: "0.75rem"
  },
  collaboratorList: {
    maxHeight: "12rem",
    overflowY: "auto",
    margin: 0,
    padding: 0,
    listStyle: "none"
  },
  collaborator: {
    ...theme.typography.paragraph1,
    padding: "0.25rem 0"
  },
  error: {
    color: theme.colorCritical
  }
}));

const DeleteProjectModal = ({ mounted, onClose, project, projects = [] }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [projectShares, setProjectShares] = useState([]);
  const [isLoadingShares, setIsLoadingShares] = useState(false);
  const [shareError, setShareError] = useState("");

  const selectedProjects = projects.length
    ? projects
    : project && !Array.isArray(project)
      ? [project]
      : [];
  const sharedSnapshots = selectedProjects
    .filter(
      selectedProject =>
        !selectedProject.dateTrashed &&
        selectedProject.dateSnapshotted &&
        selectedProject.shareCount > 0
    )
    .sort((firstProject, secondProject) =>
      firstProject.name.localeCompare(secondProject.name)
    );
  const hasSharedSnapshots = sharedSnapshots.length > 0;
  const isMultipleProjects = selectedProjects.length > 1;

  useEffect(() => {
    let ignoreResponse = false;

    const fetchProjectShares = async () => {
      if (!mounted || !hasSharedSnapshots) {
        setProjectShares([]);
        setIsLoadingShares(false);
        setShareError("");
        return;
      }

      setIsLoadingShares(true);
      setShareError("");

      try {
        const responses = await Promise.all(
          sharedSnapshots.map(selectedProject =>
            projectShareService.getByProjectId(selectedProject.id)
          )
        );

        if (!ignoreResponse) {
          setProjectShares(
            responses.flatMap((response, index) =>
              response.data.map(projectShare => ({
                ...projectShare,
                projectName: sharedSnapshots[index].name
              }))
            )
          );
        }
      } catch (err) {
        if (!ignoreResponse) {
          setProjectShares([]);
          setShareError(
            "We could not load the collaborators for the selected TDM Plan. Please cancel and try again."
          );
        }
      } finally {
        if (!ignoreResponse) setIsLoadingShares(false);
      }
    };

    fetchProjectShares();

    return () => {
      ignoreResponse = true;
    };
  }, [mounted, hasSharedSnapshots]); // eslint-disable-line react-hooks/exhaustive-deps

  const projectName = Array.isArray(project.name)
    ? project.name.join(", ")
    : project.name;
  const collaboratorNoun = projectShares.length === 1 ? "person" : "people";
  const snapshotDescription = isMultipleProjects
    ? `These snapshots are currently shared with ${projectShares.length} ${collaboratorNoun}. Deleting them will automatically revoke their access. The system sends no additional notifications.`
    : `This snapshot is currently shared with ${projectShares.length} ${collaboratorNoun}. Deleting it will automatically revoke their access. The system sends no additional notifications.`;

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      {project.dateTrashed ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />

          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            Restore TDM Plan from Trash
          </div>
          <div className={classes.subheading}>
            Are you sure you want to restore the following from the trash?
          </div>
        </div>
      ) : hasSharedSnapshots ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
            Delete TDM {isMultipleProjects ? "Plans" : "Plan"}
          </div>
          <div className={classes.subheading}>
            {isLoadingShares ? "Loading collaborators..." : snapshotDescription}
          </div>
          <div className={classes.collaboratorSection}>
            <div className={classes.collaboratorHeading}>
              Collaborators who will lose access
            </div>
            {shareError ? (
              <div className={classes.error}>{shareError}</div>
            ) : (
              <ul className={classes.collaboratorList}>
                {projectShares.map(projectShare => (
                  <li key={projectShare.id} className={classes.collaborator}>
                    {projectShare.email} - ({projectShare.projectName})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
            Delete TDM Plan
          </div>
          <div className={classes.subheading}>
            Are you sure you want to delete the following? (It will remain in
            the recycling bin for ninety days before being permanently deleted.)
          </div>
        </div>
      )}
      <div style={{ ...theme.typography.heading3, marginBottom: "1.5rem" }}>
        {projectName}
      </div>
      {hasSharedSnapshots && !project.dateTrashed && (
        <div className={classes.subheading}>
          Your TDM {isMultipleProjects ? "Plans" : "Plan"} will remain in the
          recycling bin for 90 days before being permanently deleted.
        </div>
      )}
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="secondary" id="cancelButton">
          Cancel
        </Button>
        {project.dateTrashed ? (
          <Button onClick={() => onClose("ok")} variant="primary">
            Restore
          </Button>
        ) : (
          <Button
            onClick={() => onClose("ok", projectShares)}
            variant="warning"
            disabled={hasSharedSnapshots && (isLoadingShares || !!shareError)}
          >
            {hasSharedSnapshots ? "Delete & Unshare" : "Delete"}
          </Button>
        )}
      </div>
    </ModalDialog>
  );
};

DeleteProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any,
  projects: PropTypes.array
};

export default DeleteProjectModal;
