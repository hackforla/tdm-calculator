import React, { useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { createUseStyles, useTheme } from "react-jss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* 
Provides an application-standard Modal Dialog with backdrop.

By default, has Close Box in upper-right corner, standard dialog
background and border style. You can omit the Close=Box by passing
prop showCloseBox={false}

Clicking on the backdrop or pressing the Escape key will close the
dialog, calling the onClose callback prop method with no arguments.
Usually, this means taking no action. You can disable these behaviors
by passing the prop closeOnBackdropClick={false} and/or closeOnEscape={false),
respectively.

When any of the above actions close the dialog, the onClose callback function
will be called with no arguments.

The dialog will size itself based on the dimensions of the {children}.

See the DeleteProjectModal and CopyProjectModal components for simple examples.

*/

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
  children,
  onClose,
  showCloseBox, // set false to hide closeBox
  closeOnBackdropClick, // set false to NOT close when backdrop is clicked
  closeOnEscape // set false to NOT close on pressing the Escape Key
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();

  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    // Escape key closes dialog, unless closeOnEscape === false
    [27, closeOnEscape === false ? null : onClose],
    [9, handleTabKey]
  ]);

  return createPortal(
    <div
      className={classes.modalContainer}
      role="dialog"
      aria-modal="true"
      // Clicking on the backdrop closes the modal, unless prop closeOnBackdropClick says not to
      onClick={closeOnBackdropClick === false ? null : onClose}
    >
      <div
        className={classes.modalContent}
        ref={modalRef}
        // Clicking on the modal content does not close the modal.
        // prevent click from bubbling up to the backdrop
        onClick={event => {
          event.stopPropagation();
        }}
      >
        {showCloseBox === false ? null : (
          <div className={classes.buttonFlexBox}>
            <button onClick={onClose} className={classes.closeButton}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}

ModalDialog.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  showCloseBox: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool
};
