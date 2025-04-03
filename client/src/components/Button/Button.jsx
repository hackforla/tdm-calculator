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
    letterSpacing: "0.05em",
    fontSize: "20px",
    // Following Colors are from https://www.figma.com/design/nD9QK56Mzq7xNSaSUoeGx0/TDM-Calculator?node-id=16061-4518&t=8f3dn1oKCVqu00uc-4
    boxShadow: "0 4 4 0" + theme.colorDropShadow,
    "&[disabled]:hover": {
      boxShadow: "3 4 4 0 " + theme.colorDropShadowDisabled
    },
    "&:hover": {
      boxShadow: "3 3 4 0" + theme.colorDropShadowHover
    }
  },
  primary: {
    backgroundColor: theme.colorPrimary,
    border: "none",
    // Following Colors are from https://www.figma.com/design/nD9QK56Mzq7xNSaSUoeGx0/TDM-Calculator?node-id=16061-4518&t=8f3dn1oKCVqu00uc-4
    boxShadow: "0px 4px 4px 0px" + theme.colorDropShadow,
    "&[disabled]:hover": {
      boxShadow: "3px 4px 4px 0px " + theme.colorDropShadowDisabled
    },
    "&:hover": {
      boxShadow: "3px 3px 4px 0px" + theme.colorDropShadowHover
    }
  },
  secondary: {
    color: theme.colors.primary.black,
    backgroundColor: theme.colorDefault,
    border: "1px solid " + theme.colors.primary.black,
    boxShadow: "0px 4px 4px 0px" + theme.colorDropShadow,
    // Following Colors are from https://www.figma.com/design/nD9QK56Mzq7xNSaSUoeGx0/TDM-Calculator?node-id=16061-4518&t=8f3dn1oKCVqu00uc-4
    "&[disabled]:hover": {
      boxShadow: "3px 4px 4px 0px " + theme.colorDropShadowDisabled
    },
    "&:hover": {
      boxShadow: "3px 3px 4px 0px" + theme.colorDropShadowHover
    }
  },
  tertiary: {
    color: theme.colors.primary.black,
    // Following Colors are from https://www.figma.com/design/nD9QK56Mzq7xNSaSUoeGx0/TDM-Calculator?node-id=16061-4518&t=8f3dn1oKCVqu00uc-4
    boxShadow: "0px 4px 4px 0px" + theme.colorDropShadow,
    "&:hover": {
      boxShadow: "3px 3px 4px 0px" + theme.colorDropShadowHover
    },
    "&[disabled]:hover": {
      boxShadow: "3px 4px 4px 0px " + theme.colorDropShadowDisabled
    }
  },
  warning: {
    color: theme.colorWhite,
    backgroundColor: theme.colorCritical,
    border: "none",
    // Following Colors are from https://www.figma.com/design/nD9QK56Mzq7xNSaSUoeGx0/TDM-Calculator?node-id=16061-4518&t=8f3dn1oKCVqu00uc-4
    boxShadow: "0px 4px 4px 0px " + theme.colorDropShadow,
    "&[disabled]:hover": {
      boxShadow: "3px 4px 4px 0px " + theme.colorDropShadowDisabled
    },
    "&:hover": {
      boxShadow: "3px 3px 4px 0px" + theme.colorDropShadowHover
    }
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
