import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const useStyles = createUseStyles({
  root: {
    cursor: "pointer",
    padding: "0.35em 0.7em",
    margin: "0.5em",
    fontSize: "2em",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "rgba(0, 46, 109, 0.3) 0px 3px 5px",
    backgroundColor: ({ theme }) => theme.colorPrimary,
    "&:focus": {
      borderRadius: "none"
    }
  },
  wizardNavButtonDisabled: {
    backgroundColor: ({ theme }) => theme.colorDisabled
  },
  hidden: {
    visibility: "hidden"
  },
  "@media print": {
    root: {
      display: "none"
    }
  }
});

const NavButton = ({ id, onClick, navDirection, isVisible, isDisabled }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const disabledStyle = isDisabled && classes.wizardNavButtonDisabled;
  const hiddenVisibilityStyle = !isVisible && classes.hidden;

  return (
    <button
      id={id}
      className={clsx(classes.root, disabledStyle, hiddenVisibilityStyle)}
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
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  navDirection: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default NavButton;
