import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  button: {
    cursor: "pointer",
    fontFamily: "Calibri",
    fontWeight: 700,
    height: "min-content",
    margin: "0.5em",
    padding: "0.5em 1em",
    textAlign: "center",
    textTransform: "uppercase",
    //TODO: Move these when we figure out size-related props
    letterSpacing: "0.05em",
    fontSize: "20px"
  },
  contained: {
    backgroundColor: ({ theme, color }) => theme[color],
    borderColor: "rgba(0, 0, 0, .05)", //lightest grey
    boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px"
  },
  download: {
    backgroundColor: ({ theme, color }) => theme[color],
    borderColor: "rgb(167, 197, 57)", //site standard green
    boxShadow: "rgb(167, 197, 57) 1px 2px 3px",
    marginLeft: "auto"
  },
  outlined: {
    backgroundColor: ({ theme }) => theme.colorWhite,
    borderColor: "rgba(0, 46, 109, .2)", //medium grey
    borderWidth: "thin"
  },
  text: {
    backgroundColor: "transparent",
    borderColor: "rgba(0, 0, 0, 0)", //transparent
    marginLeft: 0,
    marginRight: 0
  }
});

const Button = ({
  children,
  className,
  isDisplayed = true,
  onClick,
  variant = "contained",
  color = "colorDefault",
  type = "button",
  disabled = false,
  id
}) => {
  const theme = useTheme();
  const classes = useStyles({ color, theme });

  if (!isDisplayed) return null;
  return (
    <button
      className={clsx(classes.button, classes[variant], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  size: PropTypes.string,
  variant: PropTypes.string,
  isDisplayed: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string
};

export default Button;
