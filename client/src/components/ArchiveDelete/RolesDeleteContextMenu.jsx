import React from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
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

const RolesDeleteContextMenu = ({ user, handleDeleteUser }) => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {/* Delete User */}
      <MdDelete
        className={classes.listItemIcon}
        alt={`Delete User #${user.id} Icon`}
        style={{ color: "#C3391D" }}
      />
      <li
        onClick={() => handleDeleteUser(user)}
        className={classes.listItem}
        style={{ color: "black" }}
      >
        Permanently Delete {user.firstName} {user.lastName}
      </li>
    </ul>
  );
};

RolesDeleteContextMenu.propTypes = {
  user: PropTypes.object,
  handleDeleteUser: PropTypes.func
};

export default RolesDeleteContextMenu;
