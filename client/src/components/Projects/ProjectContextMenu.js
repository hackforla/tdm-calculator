import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
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
    "&:hover": {
      background: "#B2C0D3",
      cursor: "pointer"
    }
  },
  listItemIcon: { marginRight: "0.3rem" }
});

const ProjectContextMenu = ({
  project,
  closeMenu,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleDownloadCsv,
  handlePrintPdf,
  handleHide
}) => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const classes = useStyles();

  const handleClick = callback => {
    callback(project);
    closeMenu();
  };

  return (
    <ul className={classes.list}>
      {project.dateSnapshotted || project.loginId !== account.id ? null : (
        <li
          className={classes.listItem}
          onClick={() => handleClick(handleSnapshotModalOpen)}
        >
          <FontAwesomeIcon
            icon={faCamera}
            className={classes.listItemIcon}
            alt={`Snapshot Project #${project.id} Icon`}
          />
          Convert to Snapshot
        </li>
      )}

      <li
        onClick={() => handleClick(handlePrintPdf)}
        className={classes.listItem}
      >
        <FontAwesomeIcon
          icon={faPrint}
          className={classes.listItemIcon}
          alt={`Print Project #${project.id} Icon`}
        />
        Print
      </li>
      <li
        onClick={() => handleClick(handleDownloadCsv)}
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
        onClick={() => handleClick(handleCopyModalOpen)}
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
          onClick={() => handleClick(handleHide)}
          className={classes.listItem}
        >
          {project.dateHidden ? (
            <>
              <FontAwesomeIcon
                icon={faEye}
                className={classes.listItemIcon}
                alt={`Hide Project #${project.id} as CSV Icon`}
              />
              Unhide
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEyeSlash}
                className={classes.listItemIcon}
                alt={`Hide Project #${project.id} as CSV Icon`}
              />
              Hide
            </>
          )}
        </li>
      )}
      {project.loginId !== account.id ? null : (
        <li
          onClick={() => handleClick(handleDeleteModalOpen)}
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
  closeMenu: PropTypes.func,
  handleCopyModalOpen: PropTypes.func,
  handleDeleteModalOpen: PropTypes.func,
  handleSnapshotModalOpen: PropTypes.func,
  handleDownloadCsv: PropTypes.func,
  handlePrintPdf: PropTypes.func,
  handleHide: PropTypes.func
};

export default ProjectContextMenu;
