import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  toast: {
    border: "2px solid transparent",
    backgroundColor: "#a7c539",
    color: "#0F2940",
    maxWidth: "480px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, .2)",
    marginTop: "16px",
    display: "flex",
    position: "fixed",
    top: "5%",
    right: "5%",
    zIndex: "100"
  },
  "@media (max-width: 1024px)": {
    toast: {
      marginLeft: "0"
    }
  },
  container: {
    padding: "16px 24px",
    lineHeight: "1.4"
  },
  button: {
    border: "none",
    backgroundColor: "transparent",
    color: "#0F2940",
    fontSize: "16px",
    marginTop: "8px",
    marginRight: "8px",
    cursor: "pointer"
  }
});

const Toast = ({ children, remove, variant, topOffset }) => {
  const classes = useStyles();
  const removeRef = useRef();
  removeRef.current = remove;

  useEffect(() => {
    const duration = 8000;
    const id = setTimeout(() => removeRef.current(), duration);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={classes.toast}
      style={
        variant === "modal"
          ? {
              top: topOffset || "2.5em",
              left: "54%",
              right: "auto",
              bottom: "auto",
              transform: "translateX(-50%)",
              zIndex: 2000
            }
          : undefined
      }
    >
      <div className={classes.container}>{children}</div>
      <div>
        <button onClick={remove} className={classes.button}>
          X
        </button>
      </div>
    </div>
  );
};
Toast.propTypes = {
  children: PropTypes.string,
  remove: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "modal"]),
  topOffset: PropTypes.string,
  sidebarWidth: PropTypes.number
};

export default Toast;
