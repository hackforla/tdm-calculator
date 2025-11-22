import React from "react";
import PropTypes from "prop-types";
import { MdArchive } from "react-icons/md";
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

const RolesContextMenu = ({
  user,
  handleArchiveUser,
  ariaControlsId = undefined
}) => {
  const classes = useStyles();

  return (
    <ul className={classes.list} id={ariaControlsId}>
      <li
        onClick={() => handleArchiveUser(user)}
        className={classes.listItem}
        style={{ color: "red" }}
      >
        <MdArchive
          className={classes.listItemIcon}
          alt={`Archive User #${user.id} Icon`}
        />
        {/* Archive User */}
        Archive {user.firstName} {user.lastName}
      </li>
    </ul>
  );
};

RolesContextMenu.propTypes = {
  user: PropTypes.object,
  handleArchiveUser: PropTypes.func,
  ariaControlsId: PropTypes.string
};

export default RolesContextMenu;
