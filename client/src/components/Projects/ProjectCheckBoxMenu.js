import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { faEyeSlash, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

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
    justifyContent: "space-around",
    alignItems: "center",
    width: "4.5em"
  },
  button: {
    border: "none",
    padding: 0,
    background: "none"
  }
});

const ProjectCheckBoxMenu = ({
  handleHideBoxes,
  handleDeleteModalOpen,
  checkedProjects,
  criteria,
  projects
}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const isProjectOwner = account.id === projects.loginId;

  const isBtnDisabled = (projProp, criteriaProp) => {
    const sameDateVals = projects[projProp] !== false;
    const criteriaFilter = criteria[criteriaProp] === "all";

    // disable button if current user is not the owner
    // or if criteria is "all" and the date values are different
    return !isProjectOwner || (criteriaFilter && !sameDateVals);
  };

  const isHideBtnDisabled = isBtnDisabled("dateHidden", "visibility");
  const isDelBtnDisabled = isBtnDisabled("dateTrashed", "status");

  return (
    <div className={classes.container}>
      <div>{checkedProjects.length} Projects Selected</div>
      <ul className={classes.list}>
        <li>
          <button
            className={classes.button}
            onClick={handleHideBoxes}
            disabled={isHideBtnDisabled}
          >
            {!projects.dateHidden ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </li>
        <li>
          <button
            id="delete-btn"
            className={classes.button}
            disabled={isDelBtnDisabled}
            onClick={handleDeleteModalOpen}
          >
            <FontAwesomeIcon
              icon={faTrash}
              color={isDelBtnDisabled ? "#1010104d" : "red"}
            />
            <Tooltip
              anchorSelect="#delete-btn"
              content="Your selection includes both hidden and visible items"
              isOpen={isDelBtnDisabled ? 1 : 0}
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

ProjectCheckBoxMenu.propTypes = {
  handleHideBoxes: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  checkedProjects: PropTypes.array.isRequired,
  criteria: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
};

export default ProjectCheckBoxMenu;
