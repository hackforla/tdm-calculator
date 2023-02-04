import React from "react";
import PropTypes from "prop-types";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

const EditToggleButton = ({ id, onClick, editMode }) => {
  return (
    <Button
      type="input"
      color={!editMode ? "colorDisabled" : "colorPrimary"}
      variant="contained"
      onClick={onClick}
      id={id}
      data-testid={id}
    >
      {" "}
      <>
        <FontAwesomeIcon icon={faFloppyDisk} />
        {editMode ? ` Save Edits` : ` Edit Section`}
      </>
    </Button>
  );
};

EditToggleButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired
};

export default EditToggleButton;
