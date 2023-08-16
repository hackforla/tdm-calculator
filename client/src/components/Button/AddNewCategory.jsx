import React from "react";
import PropTypes from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
  iconContainer: {
    backgroundColor: theme.colorPrimary,
    borderRadius: "50%",
    padding: "5px"
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center"
  },
  text: {
    ...theme.typography.button,
    fontSize: "18px",
    textDecoration: "underline",
    marginLeft: "10px"
  }
}));

const AddNewCategoryButton = ({ id, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      type="input"
      variant="text"
      onClick={onClick}
      id={id}
      data-testid={id}
    >
      <div className={classes.buttonContainer}>
        <div className={classes.iconContainer}>
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </div>
        <div className={classes.text}>{` Add New Category `}</div>
      </div>
    </Button>
  );
};

AddNewCategoryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default AddNewCategoryButton;
