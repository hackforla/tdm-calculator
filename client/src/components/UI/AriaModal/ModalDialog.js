import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import AriaModal from "react-aria-modal";
import { IoCloseSharp } from "react-icons/io5";

const useStyles = createUseStyles({
  modalContainer: {
    zIndex: "999",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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
    borderRadius: "0",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.5)",
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
    backgroundColor: "transparent",
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export default function ModalDialog({
  mounted,
  children,
  onClose,
  initialFocus,
  omitCloseBox = false,
  underlayClickExits = true,
  escapeExits = true,
  title = "Title Text"
}) {
  const classes = useStyles();

  const getApplicationNode = () => {
    return document.getElementById("body");
  };

  return (
    <AriaModal
      mounted={mounted}
      titleText={title}
      onExit={() => onClose()}
      initialFocus={initialFocus || null}
      getApplicationNode={getApplicationNode}
      underlayClass={classes.modalContainer}
      dialogClass={classes.modalContent}
      includeDefaultStyles={false}
      verticallyCenter={true}
      underlayClickExits={underlayClickExits}
      escapeExits={escapeExits || false}
      // scrollDisabled={false}
    >
      <div>
        {omitCloseBox ? null : (
          <div className={classes.buttonFlexBox}>
            <button
              onClick={onClose}
              className={classes.closeButton}
              aria-label={`Close ${title} modal`}
            >
              <IoCloseSharp />
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
  escapeExits: PropTypes.bool,
  title: PropTypes.string
};
