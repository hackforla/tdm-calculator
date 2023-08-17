import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import AriaModal from "react-aria-modal";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createUseStyles(() => ({
  modalContainer: {
    zIndex: "999",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    fontSize: "1rem",
    fontWeight: "normal"
  },
  modalContent: {
    maxWidth: "90vw",
    minWidth: "40vw",
    padding: "1rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    border: "1px solid #d8dce3",
    borderRadius: "3px",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 1)"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 0
  },
  closeButton: {
    border: "0 solid white",
    backgroundColor: "transparent"
  }
}));

export default function ModalDialog({
  mounted,
  children,
  onClose,
  initialFocus,
  omitCloseBox = false,
  underlayClickExits = true,
  escapeExits = true
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const getApplicationNode = () => {
    return document.getElementById("root");
  };

  return (
    <AriaModal
      mounted={mounted}
      titleText="Title Text"
      onExit={() => onClose()}
      initialFocus={initialFocus || null}
      getApplicationNode={getApplicationNode}
      underlayClass={classes.modalContainer}
      dialogClass={classes.modalContent}
      includeDefaultStyles={false}
      verticallyCenter={true}
      underlayClickExits={underlayClickExits}
      escapeExits={escapeExits || false}
    >
      <div>
        {omitCloseBox ? null : (
          <div className={classes.buttonFlexBox}>
            <button onClick={onClose} className={classes.closeButton}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        )}
        {children}
      </div>
    </AriaModal>
  );
}

ModalDialog.propTypes = {
  mounted: PropTypes.bool,
  children: PropTypes.any,
  onClose: PropTypes.func,
  initialFocus: PropTypes.string,
  omitCloseBox: PropTypes.bool,
  underlayClickExits: PropTypes.bool,
  escapeExits: PropTypes.bool
};
