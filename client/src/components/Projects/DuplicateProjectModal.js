import React from "react";
import { createUseStyles } from "react-jss";
import * as projectService from "../../services/project.service";
import { PropTypes } from "prop-types";
import ProjectActionModal from "./ProjectActionModal";

const useStyles = createUseStyles({
  instruction: {
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "center"
  },
  inputField: {
    boxSizing: "border-box",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "16px",
    border: "1px solid #979797",
    marginTop: "8px"
  }
});

const DuplicateProjectModal = ({
  selectedProject,
  setSelectedProject,
  handleError,
  duplicateModalOpen,
  toggleDuplicateModal,
  duplicateProjectName,
  setDuplicateProjectName
}) => {
  const classes = useStyles();

  const duplicateProject = async project => {
    const jsonProject = JSON.parse(project.formInputs);
    jsonProject.PROJECT_NAME = duplicateProjectName;

    if (duplicateProjectName === "") {
      duplicateProjectName = `${project.name} (COPY)`;
    }

    try {
      await projectService.post({
        ...project,
        name: duplicateProjectName,
        formInputs: JSON.stringify(project)
      });
    } catch (err) {
      handleError(err);
    }

    toggleDuplicateModal();
    ``;
    setSelectedProject(null);
  };

  const handleDuplicateProjectNameChange = newProjectName => {
    setDuplicateProjectName(newProjectName);
  };

  return (
    <ProjectActionModal
      isOpen={duplicateModalOpen}
      onRequestClose={toggleDuplicateModal}
      contentLabel="Duplicate Modal"
      toggleCloseButton={toggleDuplicateModal}
      action="duplicate"
      title="Duplicate Project"
      submitButtonLabel="Create a Copy"
      handleSubmit={() => duplicateProject(selectedProject)}
    >
      <p className={classes.instruction}>
        Type a new name to duplicate the project,&nbsp;
        <br />
        <strong>{selectedProject && selectedProject.name}</strong>.
      </p>
      <input
        placeholder="Name of Duplicated Project"
        type="text"
        id="duplicateName"
        name="duplicateName"
        value={duplicateProjectName}
        onChange={e => handleDuplicateProjectNameChange(e.target.value)}
      />
    </ProjectActionModal>
  );
};

DuplicateProjectModal.propTypes = {
  selectedProject: PropTypes.object.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  toggleDuplicateModal: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  duplicateModalOpen: PropTypes.bool.isRequired,
  duplicateProjectName: PropTypes.string,
  setDuplicateProjectName: PropTypes.func.isRequired
};

export default DuplicateProjectModal;
