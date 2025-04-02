import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const useStyles = createUseStyles({
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

const modalStyleDefaultOverrides = {
  overlay: {
    zIndex: "999",
    position: "fixed",
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
  content: {
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
  }
};

export default function ModalDialog({
  mounted,
  children,
  onClose,
  // initialFocus,
  omitCloseBox = false,
  underlayClickExits = false,
  escapeExits = true,
  title = "Title Text"
}) {
  const classes = useStyles();

  return (
    <Modal
      isOpen={mounted}
      onRequestClose={() => onClose()}
      shouldCloseOnOverlayClick={underlayClickExits}
      shouldCloseOnEscape={escapeExits}
      contentLabel={title}
      style={modalStyleDefaultOverrides}
      // initialFocus={initialFocus || null}
    >
      <div>
        {omitCloseBox ? null : (
          <div className={classes.buttonFlexBox}>
            <button
              onClick={onClose}
              className={classes.closeButton}
              aria-label={`Close ${title} modal`}
            >
              <MdClose />
            </button>
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
}

ModalDialog.propTypes = {
  mounted: PropTypes.bool,
  children: PropTypes.any,
  onClose: PropTypes.func,
  // initialFocus: PropTypes.string,
  omitCloseBox: PropTypes.bool,
  underlayClickExits: PropTypes.bool,
  escapeExits: PropTypes.bool,
  title: PropTypes.string
};
