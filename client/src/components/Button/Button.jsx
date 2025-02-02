import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
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
    backgroundColor: ({ color }) => theme[color],
    borderColor: "rgba(0, 0, 0, .05)", //lightest grey
    boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px",
    "&[disabled]:hover": {
      boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px"
    },
    "&:hover": {
      boxShadow: "rgba(0, 46, 109, 0.6) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  download: {
    backgroundColor: ({ color }) => theme[color],
    borderColor: "rgb(167, 197, 57)", //site standard green
    boxShadow: "rgb(167, 197, 57) 1px 2px 3px",
    marginLeft: "auto",
    "&:hover": {
      boxShadow: "rgb(167, 197, 57) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  outlined: {
    backgroundColor: theme.colorWhite,
    borderColor: "rgba(0, 46, 109, .2)", //medium grey
    borderWidth: "thin",
    "&:hover": {
      boxShadow: "rgba(0, 46, 109, 0.4) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  text: {
    backgroundColor: "transparent",
    borderColor: "rgba(0, 0, 0, 0)", //transparent
    marginLeft: 0,
    marginRight: 0,
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.1) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  warning: {
    backgroundColor: theme.colors.warning, // Red background color with some transparency
    color: "white",
    "&:hover": {
      backgroundColor: theme.colors.warning, // Solid red background on hover
      boxShadow: "rgba(0, 46, 109, 0.4) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  error: {
    backgroundColor: theme.colorError,
    color: "white",
    borderColor: "rgba(0, 0, 0, .05)", //lightest grey
    boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px",
    "&[disabled]:hover": {
      boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px"
    },
    "&:hover": {
      boxShadow: "rgba(0, 46, 109, 0.6) 2px 4px 6px" // Heavier box shadow on hover
    }
  }
}));

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
  const classes = useStyles({ color });

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
