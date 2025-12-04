import React from "react";
import PropTypes from "prop-types";
import { MdRestoreFromTrash } from "react-icons/md";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyItems: "start",
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  listItem: {
    padding: "5px",
    fontSize: "16px",
    overflow: "hidden",
    width: "173px"
  },
  listItemIcon: { width: "24px" }
});

const RolesArchiveContextMenu = ({ user, handleUnarchiveUser }) => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {/* Unarchive User */}
      <MdRestoreFromTrash
        className={classes.listItemIcon}
        alt={`Archive User #${user.id} Icon`}
        style={{ color: "black" }}
      />
      <li
        onClick={() => handleUnarchiveUser(user)}
        className={classes.listItem}
      >
        Restore {user.firstName} {user.lastName}
      </li>
    </ul>
  );
};

RolesArchiveContextMenu.propTypes = {
  user: PropTypes.object,
  handleUnarchiveUser: PropTypes.func
};

export default RolesArchiveContextMenu;
