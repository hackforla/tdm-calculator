import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import clsx from "clsx";
import Button from "./Button";

const useStyles = createUseStyles(theme => ({
  navButton: {
    cursor: "pointer",
    padding: "0.35em 0.7em",
    margin: "0.5em",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "rgba(0, 46, 109, 0.3) 0px 3px 5px",
    "&:focus": {
      borderRadius: "none"
    },
    "&[disabled]:hover": {
      boxShadow: "none"
    }
  },
  wizardNavButtonDisabled: {
    cursor: "default",
    backgroundColor: theme.colorPrimaryDisabled,
    color: theme.colorGray,
    boxShadow: "none"
  },
  hidden: {
    visibility: "hidden"
  },
  "@media print": {
    navButton: {
      display: "none"
    }
  }
}));

const NavButton = ({
  id,
  onClick,
  navDirection,
  isVisible,
  isDisabled,
  color
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const maybeDisabled = isDisabled && classes.wizardNavButtonDisabled;
  const maybeHiddenVisibility = !isVisible && classes.hidden;

  return (
    <Button
      id={id}
      className={clsx(classes.navButton, maybeDisabled, maybeHiddenVisibility)}
      data-testid={id}
      color={color}
      onClick={onClick}
      disabled={isDisabled}
      ariaLabel={
        navDirection === "previous"
          ? "project creation previous page"
          : "project creation next page"
      }
    >
      {navDirection === "previous" ? (
        <MdChevronLeft fontSize="2em" />
      ) : (
        <MdChevronRight fontSize="2em" />
      )}
    </Button>
  );
};

NavButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  navDirection: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  color: PropTypes.string
};

export default NavButton;
