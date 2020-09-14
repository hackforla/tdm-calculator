import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  //TODO: make the switchView button more generic/refactor
  switchView: {
    height: "min-content",
    margin: "0.5em",
    padding: "0.5em 1em",
    boxShadow: "0px 6px 4px rgba(0,46,109,0.3)",
    border: "none",
    cursor: "pointer",
    textTransform: "uppercase",
    fontFamily: "Calibri bold",
    letterSpacing: "1px"
  },
  medium: {
    backgroundColor: ({ theme, backgroundColor }) => theme[backgroundColor],
    display: "block",
    width: "240px",
    height: "60px",
    marginBottom: "1em",
    boxShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)",
    border: "none",
    color: "#253d52",
    fontFamily: "Calibri Bold",
    fontSize: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    textAlign: "center"
  }
});

const Button = ({
  children,
  className,
  isDisplayed = true,
  onClick,
  size = "medium",
  backgroundColor = "colorDefault"
}) => {
  const theme = useTheme();
  const styles = useStyles({ backgroundColor, theme });
  const buttonStyle = size && styles[size];

  return (
    <>
      {isDisplayed && (
        <button className={styles[className] || buttonStyle} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  size: PropTypes.string,
  isDisplayed: PropTypes.bool,
  className: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default Button;
