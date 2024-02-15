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

  const tooltipMsg = (criteriaProp, msg, dateProp) => {
    if (!isProjectOwner)
      return "You have selected a project that does not belong to you";

    if (checkedProjects.length > 1 && projects[dateProp] === false) {
      return criteria[criteriaProp] === "all" ? msg : "";
    }
  };

  return (
    <div className={classes.container}>
      <div>{checkedProjects.length} Projects Selected</div>
      <ul className={classes.list}>
        <li>
          <button
            id="hide-btn"
            className={classes.button}
            disabled={isHideBtnDisabled}
            onClick={handleHideBoxes}
          >
            {!projects.dateHidden ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}

            <Tooltip
              style={{
                backgroundColor: "#e6e3e3",
                color: "#000",
                width: "10%",
                borderRadius: "10px"
              }}
              anchorSelect="#hide-btn"
              content={tooltipMsg(
                "visibility",
                "Your selection includes both hidden and visible items",
                "dateHidden"
              )}
            />
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
              style={{
                backgroundColor: "#e6e3e3",
                color: "#000",
                width: "10%",
                borderRadius: "10px"
              }}
              anchorSelect="#delete-btn"
              content={tooltipMsg(
                "status",
                "Your selection includes both deleted and active items",
                "dateTrashed"
              )}
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
