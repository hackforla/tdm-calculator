import React from "react";
import { createUseStyles } from "react-jss";
import {
  faEyeSlash,
  faTrash,
  faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "0.5em",
    marginBottom: "-1em"
  },
  list: {
    display: "flex",
    flexDirection: "row",
    listStyleType: "none",
    justifyContent: "space-between",
    alignItems: "center",
    width: "7em"
  }
});

const ProjectCheckBoxMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div># Projects Selected</div>
      <ul className={classes.list}>
        <li>
          <FontAwesomeIcon icon={faEyeSlash} />
        </li>
        <li>
          <FontAwesomeIcon icon={faFileCsv} />
        </li>
        <li>
          <FontAwesomeIcon icon={faTrash} />
        </li>
      </ul>
    </div>
  );
};

export default ProjectCheckBoxMenu;
