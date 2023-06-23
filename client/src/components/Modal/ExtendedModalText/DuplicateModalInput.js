import React from "react";
import { createUseStyles } from "react-jss";
import { PropTypes } from "prop-types";

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

const DuplicateModalInput = props => {
  const { selectedProject, setDuplicateProjectName, duplicateProjectName } =
    props;
  const classes = useStyles();

  const handleDuplicateProjectNameChange = newProjectName => {
    setDuplicateProjectName(newProjectName);
  };

  return (
    <>
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
        className={classes.inputField}
        value={duplicateProjectName}
        onChange={e => handleDuplicateProjectNameChange(e.target.value)}
      />
    </>
  );
};

DuplicateModalInput.propTypes = {
  duplicateProjectName: PropTypes.string,
  selectedProject: PropTypes.object,
  setDuplicateProjectName: PropTypes.func
};

export default DuplicateModalInput;
