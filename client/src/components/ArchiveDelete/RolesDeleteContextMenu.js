import React from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
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

const RolesDeleteContextMenu = ({ user, handleDeleteUser }) => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {/* Delete User */}
      <li
        onClick={() => handleDeleteUser(user)}
        className={classes.listItem}
        style={{ color: "red" }}
      >
        <MdDelete
          className={classes.listItemIcon}
          alt={`Delete User #${user.id} Icon`}
        />
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
