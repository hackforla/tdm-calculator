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
    fontSize: "20px",
    margin: 0,
    padding: 0
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.colors.secondary.darkNavy,
    padding: "0.5rem",
    "&:hover": {
      background: "#B2C0D3",
      cursor: "pointer"
    }
  },
  listItemDisabled: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0.5rem",
    color: theme.colors.secondary.mediumGray
  },
  listItemIcon: {
    fontSize: "28px",
    marginRight: "0.5rem"
  }
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
  handleDROModalOpenWithPreCheck,
  handlePrintPdf,
  handleHide,
  ariaControlsId,
  isDroCommitted,
  isProjectOwnerAndUser,
  isSubmittingSnapshot
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const projectStatus = project.dateSnapshotted ? "snapshot" : "draft";
  const isSnapshotSubmitted = Boolean(project.dateSubmitted);
  const getIsDeleteActionValid = () => {
    if (isProjectOwnerAndUser && projectStatus === "draft") {
      return true;
    }

    if (
      isProjectOwnerAndUser &&
      project.dateSnapshotted === "snapshot" &&
      !isSnapshotSubmitted
    ) {
      return true;
    }

    return false;
  };

  const isDeleteActionValid = getIsDeleteActionValid();

  console.log(project.dateSubmitted, "date submitted");

  const handleClick = callback => {
    callback(project);
    closeMenu();
  };

  const handleSubmitSnapshotClick = () => {
    isSubmittingSnapshot.current = true;
    if (isDroCommitted()) {
      handleSubmitModalOpen(project);
    } else {
      handleDROModalOpenWithPreCheck(project);
    }
    closeMenu();
  };

  return (
    <ul className={classes.list} id={ariaControlsId}>
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
          onClick={() => handleSubmitSnapshotClick()}
        >
          <TbFileExport
            className={classes.listItemIcon}
            alt={`Submit Project #${project.id} Icon`}
          />
          Submit Snapshot
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

      {project.loginId === account?.id &&
        (project.dateTrashed || isDeleteActionValid) && (
          <li
            onClick={() => handleClick(handleDeleteModalOpen)}
            className={classes.listItem}
            style={{
              borderTop: isDeleteActionValid ? "1px solid #B3B3B3" : "none"
            }}
          >
            {project.dateTrashed ? (
              <>
                <MdRestoreFromTrash
                  className={classes.listItemIcon}
                  alt="Restore Project from Trash Icon"
                />
                Restore from Trash
              </>
            ) : (
              <>
                <MdDelete
                  className={classes.listItemIcon}
                  style={{ color: theme.colorCritical }}
                  alt="Delete Project Icon"
                />
                <p style={{ color: theme.colorCritical, fontSize: 20 }}>
                  Delete
                </p>
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
  handleDROModalOpenWithPreCheck: PropTypes.func,
  handlePrintPdf: PropTypes.func,
  handleHide: PropTypes.func,
  ariaControlsId: PropTypes.string,
  isDroCommitted: PropTypes.func,
  isProjectOwnerAndUser: PropTypes.bool.isRequired,
  isSubmittingSnapshot: PropTypes.object
};

export default ProjectContextMenu;
