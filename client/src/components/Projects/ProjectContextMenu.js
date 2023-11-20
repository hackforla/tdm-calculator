import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useState } from "react";
import PropTypes from "prop-types";

import { createUseStyles } from "react-jss";
import {
  faPrint,
  faEye,
  faEyeSlash,
  faCamera,
  faTrash,
  faClone,
  faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  handleSnapshotModalOpen,
  handleDownloadCsv,
  handlePrintPdf,
  handleHide
}) => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const [projectVisibility, SetProjectVisibility] = useState(
    project.dateHidden
  );
  const toggleProjectVisibility = () => {
    SetProjectVisibility(!projectVisibility);
  };

  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {project.dateSnapshotted || project.loginId !== account.id ? null : (
        <li
          className={classes.listItem}
          onClick={() => handleSnapshotModalOpen(project)}
        >
          <FontAwesomeIcon
            icon={faCamera}
            className={classes.listItemIcon}
            alt={`Snapshot Project #${project.id} Icon`}
          />
          Convert to Snapshot
        </li>
      )}

      <li onClick={() => handlePrintPdf(project)} className={classes.listItem}>
        <FontAwesomeIcon
          icon={faPrint}
          className={classes.listItemIcon}
          alt={`Print Project #${project.id} Icon`}
        />
        Print
      </li>
      <li
        onClick={() => handleDownloadCsv(project)}
        className={classes.listItem}
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
        <FontAwesomeIcon
          icon={faClone}
          className={classes.listItemIcon}
          alt={`Duplicate Project #${project.id} Icon`}
        />
        Duplicate
      </li>
      {project.loginId !== account.id ? null : (
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
      )}
      {project.loginId !== account.id ? null : (
        <li
          onClick={() => handleDeleteModalOpen(project)}
          className={classes.listItem}
          style={{ borderTop: "1px solid black", color: "red" }}
        >
          {project.dateTrashed ? (
            <>
              <FontAwesomeIcon
                icon={faTrash}
                className={classes.listItemIcon}
                alt={`Remove Project #${project.id} from Trash Icon`}
              />
              Remove from Trash
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faTrash}
                className={classes.listItemIcon}
                alt={`Move  Project #${project.id} to Trash Icon`}
              />
              Move to Trash
            </>
          )}
        </li>
      )}
    </ul>
  );
};

ProjectContextMenu.propTypes = {
  project: PropTypes.object,
  handleCopyModalOpen: PropTypes.func,
  handleDeleteModalOpen: PropTypes.func,
  handleSnapshotModalOpen: PropTypes.func,
  handleDownloadCsv: PropTypes.func,
  handlePrintPdf: PropTypes.func,
  handleHide: PropTypes.func
};

export default ProjectContextMenu;
