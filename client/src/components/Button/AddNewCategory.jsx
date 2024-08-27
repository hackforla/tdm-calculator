import React from "react";
import PropTypes from "prop-types";
import { MdAddCircle } from "react-icons/md";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
  icon: {
    color: theme.colorPrimary,
    fontSize: "xx-large"
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  text: {
    ...theme.typography.button,
    fontSize: "18px",
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
        <MdAddCircle className={classes.icon} color="primary" />
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
