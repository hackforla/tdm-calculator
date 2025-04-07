import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";

import { createUseStyles, useTheme } from "react-jss";
import { FaFileCsv } from "react-icons/fa6";
import { TbFileExport } from "react-icons/tb";
import {
  MdPrint,
  MdVisibility,
  MdVisibilityOff,
  MdCameraAlt,
  MdDelete,
  MdRestoreFromTrash,
  MdFileCopy,
  MdEdit,
  MdOutlineIosShare
} from "react-icons/md";

const useStyles = createUseStyles(theme => ({
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
  listItemDisabled: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem",
    color: theme.colors.secondary.mediumGray
  },
  listItemIcon: { marginRight: "0.3rem" }
}));

const ProjectContextMenu = ({
  project,
  closeMenu,
  handleCsvModalOpen,
  handleCopyModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleRenameSnapshotModalOpen,
  handleShareSnapshotModalOpen,
  handleSubmitModalOpen,
  handlePrintPdf,
  handleHide
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);
  const account = userContext.account;

  const handleClick = callback => {
    callback(project);
    closeMenu();
  };

  return (
    <ul className={classes.list}>
      {project.dateSnapshotted && project.loginId == account?.id ? (
        <li
          className={classes.listItem}
          onClick={() => handleClick(handleRenameSnapshotModalOpen)}
        >
          <MdEdit
            className={classes.listItemIcon}
            alt={`Snapshot Project #${project.id} Icon`}
          />
          Rename Snapshot
        </li>
      ) : null}

      {project.dateSnapshotted && project.loginId !== account?.id ? (
        <li className={classes.listItemDisabled}>
          <MdEdit
            className={classes.listItemIcon}
            alt={`Snapshot Project #${project.id} Icon`}
          />
          Rename Snapshot
        </li>
      ) : null}

      {project.dateSnapshotted && project.loginId == account?.id ? (
        <li
          className={classes.listItem}
          onClick={() => handleClick(handleShareSnapshotModalOpen)}
        >
          <MdOutlineIosShare
            className={classes.listItemIcon}
            alt={`Share Snapshot #${project.id} Icon`}
          />
          Share Snapshot
        </li>
      ) : null}

      {!project.dateSnapshotted && project.loginId == account?.id ? (
        <li
          className={classes.listItem}
          onClick={() => handleClick(handleSnapshotModalOpen)}
        >
          <MdCameraAlt
            className={classes.listItemIcon}
            alt={`Snapshot Project #${project.id} Icon`}
          />
          Convert to Snapshot
        </li>
      ) : null}

      {project.dateSnapshotted &&
      !project.dateSubmitted &&
      // project.earnedPoints >= project.targetPoints &&
      project.loginId == account?.id ? (
        <li
          className={classes.listItem}
          onClick={() => handleClick(handleSubmitModalOpen)}
        >
          <TbFileExport
            className={classes.listItemIcon}
            alt={`Submit Project #${project.id} Icon`}
          />
          Submit to LADOT
        </li>
      ) : null}

      <li
        onClick={() => handleClick(handlePrintPdf)}
        className={classes.listItem}
      >
        <MdPrint
          className={classes.listItemIcon}
          alt={`Print Project #${project.id} Icon`}
        />
        Print Summary
      </li>
      <li
        onClick={() => handleClick(() => handleCsvModalOpen(project))}
        className={classes.listItem}
      >
        <FaFileCsv
          className={classes.listItemIcon}
          alt={`Export Project #${project.id} as CSV Icon`}
        />
        Export as CSV
      </li>
      <li
        onClick={() => handleClick(handleCopyModalOpen)}
        className={classes.listItem}
      >
        <MdFileCopy
          className={classes.listItemIcon}
          alt={`Duplicate Project #${project.id} Icon`}
        />
        Duplicate
      </li>

      <li onClick={() => handleClick(handleHide)} className={classes.listItem}>
        {project.dateHidden ? (
          <>
            <MdVisibility
              className={classes.listItemIcon}
              alt={`Hide Project #${project.id} as CSV Icon`}
            />
            Unhide
          </>
        ) : (
          <>
            <MdVisibilityOff
              className={classes.listItemIcon}
              alt={`Hide Project #${project.id} as CSV Icon`}
            />
            Hide
          </>
        )}
      </li>

      {project.loginId !== account?.id ? null : (
        <li
          onClick={() => handleClick(handleDeleteModalOpen)}
          className={classes.listItem}
          style={{ borderTop: "1px solid black" }}
        >
          {project.dateTrashed ? (
            <>
              <MdRestoreFromTrash
                className={classes.listItemIcon}
                alt={`Restore Project from Trash Icon`}
              />
              Restore from Trash
            </>
          ) : (
            <>
              <MdDelete
                className={classes.listItemIcon}
                style={{ color: theme.colorCritical }}
                alt={`Delete Project Icon`}
              />
              Delete
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
  handleCsvModalOpen: PropTypes.func,
  handleCopyModalOpen: PropTypes.func,
  handleDeleteModalOpen: PropTypes.func,
  handleSnapshotModalOpen: PropTypes.func,
  handleRenameSnapshotModalOpen: PropTypes.func,
  handleShareSnapshotModalOpen: PropTypes.func,
  handleSubmitModalOpen: PropTypes.func,
  handlePrintPdf: PropTypes.func,
  handleHide: PropTypes.func
};

export default ProjectContextMenu;
