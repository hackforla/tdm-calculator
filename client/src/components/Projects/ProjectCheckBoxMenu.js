import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  faEyeSlash,
  faEye,
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

const ProjectCheckBoxMenu = ({
  handleHideBoxes,
  checkedProjects,
  hiddenStatus,
  criteria
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{checkedProjects.length} Projects Selected</div>
      <ul className={classes.list}>
        <li>
          <button
            onClick={handleHideBoxes}
            disabled={criteria.visibility === "all" && hiddenStatus === null}
          >
            {!hiddenStatus ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
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

ProjectCheckBoxMenu.propTypes = {
  handleHideBoxes: PropTypes.func.isRequired,
  checkedProjects: PropTypes.array.isRequired,
  hiddenStatus: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  criteria: PropTypes.object.isRequired
};

export default ProjectCheckBoxMenu;
