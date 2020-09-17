import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const useStyles = createUseStyles({
  wizardNavButton: {
    padding: "0.35em 0.7em",
    margin: "0.5em",
    fontSize: "2em",
    border: "none",
    backgroundColor: "#a7c539"
  },
  wizardNavButtonDisabled: {
    padding: "0.35em 0.7em",
    margin: "0.5em",
    fontSize: "2em",
    border: "none",
    textShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)"
  },
  hidden: {
    visibility: "hidden"
  },
  "@media print": {
    wizardNavButton: {
      display: "none"
    },
    wizardNavButtonDisabled: {
      display: "none"
    }
  }
});

const NavButton = ({ id, onClick, navDirection, isVisible, isDisabled }) => {
  const classes = useStyles();
  const normalOrDisabledStyle = isDisabled
    ? classes.wizardNavButtonDisabled
    : classes.wizardNavButton;
  const hiddenVisibilityStyle = !isVisible && classes.hidden;

  return (
    <button
      id={id}
      className={clsx(normalOrDisabledStyle, hiddenVisibilityStyle)}
      data-testid={id}
      onClick={onClick}
      disabled={isDisabled}
    >
      <FontAwesomeIcon
        icon={navDirection === "previous" ? faAngleLeft : faAngleRight}
      />
    </button>
  );
};

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  navDirection: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default NavButton;
