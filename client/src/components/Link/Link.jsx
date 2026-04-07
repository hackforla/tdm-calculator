import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
  link: {
    fontFamily: "Calibri",
    fontWeight: 700,
    letterSpacing: "0.05em",
    fontSize: "20px",
    color: theme.colorPrimary,
    textDecoration: "none",
    cursor: "pointer",
    margin: "0.2em", // adding some margin for spacing like the button had
    padding: "8px 10px",
    "&[aria-disabled='true'], &[disabled]": {
      color: theme.colorGray,
      cursor: "default",
      textDecoration: "none"
    }
  },
  activeLink: {
    backgroundColor: theme.colorPrimary,
    color: theme.colorWhite,
    padding: "8px 12px",
    textDecoration: "none",
    cursor: "default"
  }
}));

const Link = ({
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
        if (disabled || isActive) {
          e.preventDefault();
          return;
        }
        if (onClick) onClick(e);
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

Link.propTypes = {
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

export default Link;
