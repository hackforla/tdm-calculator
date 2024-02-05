import React from "react";
import PropTypes from "prop-types";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

const EditToggleButton = ({ id, onClick, editMode }) => {
  return (
    <Button
      color={!editMode ? "colorDisabled" : "colorPrimary"}
      variant="contained"
      onClick={onClick}
      id={id}
      data-testid={id}
      style={{ margin: "0" }}
    >
      <>
        <FontAwesomeIcon icon={faEdit} />
        {editMode ? ` SAVE EDITS` : ` EDIT FAQ PAGE`}
      </>
    </Button>
  );
};

EditToggleButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired
};

export default EditToggleButton;
