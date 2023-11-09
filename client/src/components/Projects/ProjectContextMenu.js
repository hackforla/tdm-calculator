import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  faPrint,
  faEye,
  faEyeSlash,
  faCamera,
  faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyIcon from "../../images/copy.png";
import DeleteIcon from "../../images/trash.png";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  list: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem",
    cursor: "pointer"
  },
  listItemIcon: { marginRight: "0.3rem" }
});

const ProjectContextMenu = ({
  project,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleDownloadCsv
}) => {
  const [projectVisibility, SetProjectVisibility] = useState(
    project.dateHidden
  );
  const toggleProjectVisibility = () => {
    SetProjectVisibility(!projectVisibility);
  };

  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {project.dateSnapshotted ? null : (
        <li className={classes.listItem}>
          <FontAwesomeIcon
            icon={faCamera}
            className={classes.listItemIcon}
            alt={`Snapshot Project #${project.id} Icon`}
          />
          Convert to Snapshot
        </li>
      )}

      <li className={classes.listItem}>
        <FontAwesomeIcon
          icon={faPrint}
          className={classes.listItemIcon}
          alt={`Print Project #${project.id} Icon`}
        />
        Print
      </li>
      <li
        className={classes.listItem}
        onClick={() => handleDownloadCsv(project)}
      >
        <FontAwesomeIcon
          icon={faFileCsv}
          className={classes.listItemIcon}
          alt={`Export Project #${project.id} as CSV Icon`}
        />
        Export as CSV
      </li>
      <li
        onClick={() => handleCopyModalOpen(project)}
        className={classes.listItem}
      >
        <img
          src={CopyIcon}
          alt={`Duplicate Project #${project.id} Icon`}
          className={classes.listItemIcon}
        />
        Duplicate
      </li>
      <li
        onClick={() => toggleProjectVisibility(project)}
        className={classes.listItem}
      >
        {projectVisibility ? (
          <>
            <FontAwesomeIcon
              icon={faEyeSlash}
              className={classes.listItemIcon}
              alt={`Unhide Project #${project.id} as CSV Icon`}
            />
            Unhide
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faEye}
              className={classes.listItemIcon}
              alt={`Hide Project #${project.id} as CSV Icon`}
            />
            Hide from View
          </>
        )}
      </li>
      <li
        onClick={() => handleDeleteModalOpen(project)}
        className={classes.listItem}
        style={{ borderTop: "1px solid black", color: "red" }}
      >
        {project.dateTrashed ? (
          <>
            <img
              src={DeleteIcon}
              alt={`Remove Project #${project.id} from Trash Icon`}
              className={classes.listItemIcon}
            />
            Remove from Trash
          </>
        ) : (
          <>
            <img
              src={DeleteIcon}
              alt={`Move  Project #${project.id} to Trash Icon`}
              className={classes.listItemIcon}
            />
            Move to Trash
          </>
        )}
      </li>
    </ul>
  );
};

ProjectContextMenu.propTypes = {
  project: PropTypes.object,
  handleCopyModalOpen: PropTypes.func,
  handleDeleteModalOpen: PropTypes.func,
  handleDownloadCsv: PropTypes.func
};

export default ProjectContextMenu;
