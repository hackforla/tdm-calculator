import React from "react";
import PropTypes from "prop-types";
import { MdAdd, MdOutlinePeopleAlt } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { createUseStyles, useTheme } from "react-jss";
import { getProjectShareStatus, SHARING_STATUS } from "./projectHelpers";

const useStyles = createUseStyles(theme => ({
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    fontSize: "1.3rem",
    color: theme.colorText,
    background: "transparent",
    border: "none",
    borderRadius: "4px"
  },
  button: {
    cursor: "pointer",
    "&:hover, &:focus-visible": {
      color: theme.colorLADOT
    }
  },
  sharedByMe: {
    color: theme.colorLinkBlue,
    "&:hover, &:focus-visible": {
      color: theme.colorLinkBlue
    }
  }
}));

const ProjectSharingStatus = ({ project, loginId, onShare }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const isOwner = project.loginId === loginId;
  const sharingStatus = getProjectShareStatus(project, loginId);
  const isShared = sharingStatus !== SHARING_STATUS.NOT_SHARED;
  const tooltipId = `sharing-tooltip-${project.id}`;

  if (
    !project.dateSnapshotted ||
    project.dateTrashed ||
    (!isOwner && !isShared)
  ) {
    return null;
  }

  const label = isOwner
    ? isShared
      ? "Share or Unshare Snapshot"
      : "Share Snapshot"
    : "Snapshot Shared with Me";
  const icon = isShared ? (
    <MdOutlinePeopleAlt aria-hidden="true" />
  ) : (
    <MdAdd aria-hidden="true" />
  );
  const tooltipAttributes = {
    "data-tooltip-id": tooltipId,
    "data-tooltip-content": label,
    "aria-label": label
  };

  return (
    <>
      {isOwner ? (
        <button
          type="button"
          className={`${classes.icon} ${classes.button} ${isShared ? classes.sharedByMe : ""}`}
          onClick={() => onShare(project)}
          {...tooltipAttributes}
        >
          {icon}
        </button>
      ) : (
        <span
          className={classes.icon}
          role="img"
          tabIndex={0}
          {...tooltipAttributes}
        >
          {icon}
        </span>
      )}
      <Tooltip
        id={tooltipId}
        place="bottom"
        border={`1px solid ${theme.colorLADOTBlack}`}
        style={{
          ...theme.typography.paragraph1,
          backgroundColor: theme.colorDeselect,
          color: theme.colorText,
          maxWidth: "10rem",
          borderRadius: "5px",
          zIndex: 20,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.3)"
        }}
      />
    </>
  );
};

ProjectSharingStatus.propTypes = {
  project: PropTypes.object.isRequired,
  loginId: PropTypes.number,
  onShare: PropTypes.func.isRequired
};

export default ProjectSharingStatus;
