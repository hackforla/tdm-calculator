import React from "react";
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
  listItem: { display: "flex", flexDirection: "row", padding: "0.5rem" },
  listItemIcon: { marginRight: "0.3rem" }
});

const ProjectContextMenu = ({
  project,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleDownloadCSV,
  handleHide,
  handlePrint
}) => {
  const classes = useStyles();

  return (
    <>
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

        <li className={classes.listItem} onClick={() => handlePrint(project)}>
          <FontAwesomeIcon
            icon={faPrint}
            className={classes.listItemIcon}
            alt={`Print Project #${project.id} Icon`}
          />
          Print
        </li>
        <li
          onClick={() => handleDownloadCSV(project)}
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
          <img
            src={CopyIcon}
            alt={`Duplicate Project #${project.id} Icon`}
            className={classes.listItemIcon}
          />
          Duplicate
        </li>
        <li onClick={() => handleHide(project)} className={classes.listItem}>
          {project.dateHidden ? (
            <>
              <FontAwesomeIcon
                icon={faEyeSlash}
                className={classes.listItemIcon}
                alt={`Unhide Project #${project.id} as Unhide Icon`}
              />
              Unhide
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEye}
                className={classes.listItemIcon}
                alt={`Hide Project #${project.id} as Hide Icon`}
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
                alt={`Restore Project #${project.id} from Trash Icon`}
                className={classes.listItemIcon}
              />
              Restore from Trash
            </>
          ) : (
            <>
              <img
                src={DeleteIcon}
                alt={`Move  Project #${project.id} to Trash Icon`}
                className={classes.listItemIcon}
              />
              Delete
            </>
          )}
        </li>
      </ul>
    </>
  );
};

ProjectContextMenu.propTypes = {
  project: PropTypes.object.isRequired,
  handleCopyModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  handleDownloadCSV: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  handlePrint: PropTypes.func.isRequired
};

export default ProjectContextMenu;
