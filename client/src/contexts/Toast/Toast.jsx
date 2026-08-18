import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import CloseBox from "../../components/UI/CloseBox";

const useStyles = createUseStyles(theme => ({
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
  closeBox: {
    backgroundColor: "transparent",
    color: theme.colorLADOTBlack,
    position: "absolute",
    top: "0",
    right: "0"
  }
}));

const Toast = ({ children, remove, variant }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const removeRef = useRef();
  removeRef.current = remove;

  useEffect(() => {
    const duration = 8000;
    const id = setTimeout(() => removeRef.current(), duration);
    return () => clearTimeout(id);
  }, []);

  const isModal = variant === "modal";

  return (
    <div
      className={classes.toast}
      style={
        isModal
          ? {
              position: "absolute",
              top: "-2em",
              left: "50%",
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
        <CloseBox
          onClick={remove}
          aria-label="Close popup"
          className={classes.closeBox}
        />
      </div>
    </div>
  );
};
Toast.propTypes = {
  children: PropTypes.string,
  remove: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "modal"]),
  sidebarWidth: PropTypes.number
};

export default Toast;
