import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
  link: {
    fontFamily: "Calibri",
    fontWeight: 600,
    letterSpacing: "0.1em",
    fontSize: "23px",
    color: theme.colorLADOTBlack,
    textDecoration: "none",
    cursor: "pointer",
    margin: "0.2em 0.1em",
    padding: "0.6em 0.8em",
    "&[aria-disabled='true'], &[disabled]": {
      color: theme.colorGray,
      cursor: "default",
      textDecoration: "none"
    }
  },
  activeLink: {
    backgroundColor: theme.colorPrimary,
    fontWeight: 700,
    fontSize: "25px",
    color: theme.colorLADOTBlack,
    cursor: "default"
  }
}));

const NumberedLink = ({
  children,
  className,
  isDisplayed = true,
  onClick,
  disabled = false,
  ariaLabel = undefined,
  id,
  href = "#",
  isActive = false
}) => {
  const classes = useStyles();

  if (!isDisplayed) return null;

  return (
    <a
      className={clsx(classes.link, isActive && classes.activeLink, className)}
      onClick={e => {
        e.preventDefault();
        if (disabled || isActive) {
          return;
        }
        if (onClick) {
          onClick(e);
        }
      }}
      href={disabled ? undefined : href}
      aria-label={ariaLabel}
      id={id}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
    >
      {children}
    </a>
  );
};

NumberedLink.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  isDisplayed: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool
};

export default NumberedLink;
