import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { MdEdit } from "react-icons/md";

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
        <MdEdit />
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
