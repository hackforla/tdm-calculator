import React from "react";
import WarningIcon from "../../images/warning-icon.png";
import { createUseStyles } from "react-jss";
import * as projectService from "../../services/project.service";
import { PropTypes } from "prop-types";
import ProjectActionModal from "./ProjectActionModal";

const useStyles = createUseStyles({
  instruction: {
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "center",
    color: "#B64E38",
    "& span": {
      fontStyle: "italic"
    }
  },
  warningIcon: {
    float: "left",
    margin: "4px 12px 12px 0"
  }
});

const DeleteProjectModal = ({
  selectedProject,
  setSelectedProject,
  handleError,
  deleteModalOpen,
  toggleDeleteModal,
  setDeleteModalOpen
}) => {
  const classes = useStyles();

  const deleteProject = async project => {
    try {
      await projectService.del(project.id);
    } catch (err) {
      handleError(err);
    }

    toggleDeleteModal();
    setSelectedProject(null);
  };

  return (
    <ProjectActionModal
      isOpen={true}
      onRequestClose={() => setDeleteModalOpen(!deleteModalOpen)}
      contentLabel="Delete Modal"
      toggleCloseButton={() => setDeleteModalOpen(!deleteModalOpen)}
      action="delete"
      title="Delete Project"
      submitButtonLabel="Delete"
      handleSubmit={() => deleteProject(selectedProject)}
    >
      <p className={classes.instruction}>
        <img src={WarningIcon} className={classes.warningIcon} alt="Warning" />
        Are you sure you want to <span>permanently</span> delete this project,
        &nbsp;
        <strong>{selectedProject && selectedProject.name}</strong>?
      </p>
    </ProjectActionModal>
  );
};

DeleteProjectModal.propTypes = {
  selectedProject: PropTypes.object.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  toggleDeleteModal: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  deleteModalOpen: PropTypes.bool.isRequired,
  setDeleteModalOpen: PropTypes.func.isRequired
};

export default DeleteProjectModal;
