import React from "react";
import PropTypes from "prop-types";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const RolesArchiveContextMenu = ({ user, handleUnarchiveUser }) => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
    {/* Unarchive User */}
      <li
        onClick={() => handleUnarchiveUser(user)}
        className={classes.listItem}
        style={{ color: "black" }}
      >
        <FontAwesomeIcon
          icon={faUndo}
          className={classes.listItemIcon}
          alt={`Archive User #${user.id} Icon`}
        />
        Unarchive & Restore {user.firstName} {user.lastName}
      </li>
    </ul>    
  );
};

RolesArchiveContextMenu.propTypes = {
  user: PropTypes.object,
  handleArchiveUser: PropTypes.func
};

export default RolesArchiveContextMenu;
