import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
// import ModalDialog from "../UI/AriaModal/ModalDialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { MdEdit } from "react-icons/md";
import AriaModal from "react-aria-modal";
import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
  adminNotesModalContainer: {
    zIndex: "900", //must be less than 999 for warning modal
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
  adminNotesModalContent: {
    maxWidth: "90vw",
    minWidth: "40vw",
    width: "67.5rem",
    height: "40.5rem",
    padding: "0",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    border: "1px solid #d8dce3",
    borderRadius: "10px",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 1)"
  },
  buttonFlexBox1: {
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
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    // height: "auto",
    boxSizing: "border-box",
    width: "67.5rem",
    height: "40.5rem"
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "24px",
    marginTop: "16px",
    marginRight: "24px"
  },
  subHeader: {
    fontSize: "20px",
    lineHeight: "28px",
    textAlign: "left",
    marginBottom: "0",
    marginTop: "16px"
  },
  textareaWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column",
    paddingLeft: "32px",
    paddingRight: "32px",
    flexGrow: 1
  },
  textarea: {
    width: "100%",
    height: "100%",
    padding: "8px",
    boxSizing: "border-box",
    flexGrow: 1,
    resize: "none",
    maxHeight: "414px",
    overflowY: "auto"
  },
  addNewTextArea: {
    width: "100%",
    height: "100%",
    padding: "8px",
    boxSizing: "border-box",
    flexGrow: 1,
    maxHeight: "414px",
    overflowY: "auto",
    border: "2px solid #0075FF ! important",
    borderRadius: "5px"
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "14px 10px 14px 10px",
    boxSizing: "border-box"
  },
  button: {
    cursor: "pointer",
    fontFamily: "Calibri",
    fontWeight: 700,
    height: "min-content",
    margin: "0.5em",
    padding: "0.25em 1em",
    textAlign: "center",
    textTransform: "uppercase",
    //TODO: Move these when we figure out size-related props
    letterSpacing: "0.05em",
    fontSize: "20px"
  },
  contained: {
    borderColor: "rgba(0, 0, 0, .05)", //lightest grey
    boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px",
    "&[disabled]:hover": {
      boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px"
    },
    "&:hover": {
      boxShadow: "rgba(0, 46, 109, 0.6) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  editButton: {
    width: "10.6rem", //    padding: "10px 20px",
    height: "3.6rem",
    fontSize: "16px",
    backgroundColor: "#A7C539"
  },
  cancelButton: {
    width: "7.3rem", //    padding: "10px 20px",
    height: "3.6rem",
    fontSize: "16px"
  },
  saveButton: {
    width: "6.7rem", //    padding: "10px 20px",
    height: "3.6rem",
    fontSize: "16px",
    backgroundColor: "#A7C539"
  },
  buttonFlexBox2: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    width: "100%"
  },
  heading1: theme.typography.heading1,
  instruction: {
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "center",
    color: "#B64E38",
    "& span": {
      fontStyle: "italic"
    }
  },
  warningIcon: {
    margin: "0 10px"
  }
}));

const AdminNotesModal = ({
  //removed onSave and isEditing
  mounted,
  adminNotes,
  setAdminNotes,
  onCancel,
  onSave,
  handleEdit,
  isEditing,
  isNewNote,
  textUpdated
}) => {
  const classes = useStyles();

  const [initialFocusId, setInitialFocusId] = useState(null);

  const handleInitialFocusRef = node => {
    if (node) {
      setInitialFocusId(node.id); // Assign the button node as the initial focus target
    }
  };

  // Cleanup on unmount to prevent issues with stale selector
  /* eslint-disable no-console */
  useEffect(() => {
    console.log("ANM mounted or updated");
    return () => {
      console.log("ANM is unmounting, resetting initial focus id");
      setInitialFocusId(""); // Reset the id when the component unmounts
    };
  }, []);

  // Log the mounted prop to see if it controls rendering
  useEffect(() => {
    console.log("ANM Mounted prop value:", mounted);
    console.log("ANM Initial focus id:", initialFocusId);
  }, [mounted, initialFocusId]);

  if (!mounted) {
    //setInitialFocusId(""); // Reset the id when the component unmounts
    console.log("ANM is not mounted, returning null");
    return null; // Ensure the component is properly unmounted when `mounted` is false
  }

  const validInitialFocusId = document.getElementById(initialFocusId)
    ? initialFocusId
    : null;

  const getApplicationNode = () => {
    return document.getElementById("body");
  };

  let modalContent;
  if (isNewNote) {
    // Add a new note - focus on the textarea, enable save button when there is text
    modalContent = (
      <AriaModal
        mounted={mounted}
        titleText="Admin Notes Modal"
        getApplicationNode={getApplicationNode}
        underlayClass={classes.adminNotesModalContainer}
        dialogClass={classes.adminNotesModalContent}
        includeDefaultStyles={false}
        verticallyCenter={true}
        underlayClickExits={false}
        escapeExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        initialFocus={validInitialFocusId || undefined}
        dialogStyle={{ width: "67.5rem", height: "40.5rem" }}
      >
        <div className={classes.contentContainer}>
          <div className={classes.headerWrapper}>
            <h2
              id="modal-title"
              style={{
                fontWeight: "bold",
                margin: "0px",
                lineHeight: "32px",
                color: "#0f2940"
              }}
            >
              Add a New Note
            </h2>
            <CloseOutlinedIcon onClick={onCancel} aria-label="Close" />
          </div>
          <div
            style={{ borderTop: "1px solid #ccc", margin: "8px 0px 0px 0px" }}
          />
          <div className={classes.textareaWrapper}>
            <h3 className={classes.subHeader} style={{ fontWeight: "normal" }}>
              Note
            </h3>
            <textarea
              type="text"
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              autoFocus
              className={classes.addNewTextArea}
              ref={handleInitialFocusRef} //callback function to set the initial focus node
              id="addNewNote"
            />
          </div>
          <div
            style={{
              borderTop: "1px solid #ccc",
              marginTop: "10px",
              marginBottom: "0"
            }}
          />
          <div className={classes.buttonWrapper}>
            <Button
              onClick={onCancel}
              id="cancelButton"
              className={classes.cancelButton}
              title="Cancel"
            >
              Cancel
            </Button>
            <Button
              color="colorPrimary"
              variant="outlined"
              onClick={onSave}
              id="saveButton"
              className={classes.saveButton}
              disabled={adminNotes.trim() === ""}
              title="Save Note"
            >
              SAVE
            </Button>
          </div>
        </div>
      </AriaModal>
    );
  } else if (!isEditing) {
    // Viewing a note with option to edit - textarea is read-only, focus on edit button
    modalContent = (
      <AriaModal
        mounted={mounted}
        titleText="View Note Modal"
        getApplicationNode={getApplicationNode}
        underlayClass={classes.adminNotesModalContainer}
        dialogClass={classes.adminNotesModalContent}
        includeDefaultStyles={false}
        verticallyCenter={true}
        underlayClickExits={false}
        escapeExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        initialFocus={initialFocusId || undefined}
        dialogStyle={{ width: "67.5rem", height: "40.5rem" }}
      >
        <div className={classes.contentContainer}>
          <div className={classes.headerWrapper}>
            <h2
              id="modal-title"
              style={{
                fontWeight: "bold",
                margin: "0px",
                lineHeight: "32px",
                color: "#0f2940"
              }}
            >
              View Note
            </h2>
            <CloseOutlinedIcon onClick={onCancel} aria-label="Close" />
          </div>
          <div
            style={{ borderTop: "1px solid #ccc", margin: "8px 0px 0px 0px" }}
          />
          <div className={classes.textareaWrapper}>
            <h3 className={classes.subHeader} style={{ fontWeight: "normal" }}>
              Note
            </h3>
            <textarea
              type="text"
              value={adminNotes}
              readOnly
              autoFocus
              className={classes.textarea}
            />
          </div>
          <div
            style={{
              borderTop: "1px solid #ccc",
              marginTop: "10px",
              marginBottom: "0"
            }}
          />
          <div className={classes.buttonWrapper}>
            <button
              onClick={handleEdit}
              className={clsx(
                classes.button,
                classes.contained,
                classes.editButton
              )}
              title="Edit Note"
              ref={handleInitialFocusRef}
              id="editButton"
              color="#A7C539"
            >
              <MdEdit />
              EDIT NOTE
            </button>
          </div>
        </div>
      </AriaModal>
    );
  } else {
    //editing a note - focus on the textarea, add blue outline, enable save button when there is change
    modalContent = (
      <AriaModal
        mounted={mounted}
        titleText="View Note Modal"
        getApplicationNode={getApplicationNode}
        underlayClass={classes.adminNotesModalContainer}
        dialogClass={classes.adminNotesModalContent}
        includeDefaultStyles={false}
        verticallyCenter={true}
        underlayClickExits={false}
        escapeExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        initialFocus={initialFocusId || undefined}
        dialogStyle={{ width: "67.5", height: "40.5" }}
      >
        <div className={classes.contentContainer}>
          <div className={classes.headerWrapper}>
            <h2
              id="modal-title"
              style={{
                fontWeight: "bold",
                margin: "0px",
                lineHeight: "32px",
                color: "#0f2940"
              }}
            >
              Edit Note
            </h2>
            <CloseOutlinedIcon onClick={onCancel} aria-label="Close" />
          </div>
          <div
            style={{ borderTop: "1px solid #ccc", margin: "8px 0px 0px 0px" }}
          />
          <div className={classes.textareaWrapper}>
            <h3 className={classes.subHeader} style={{ fontWeight: "normal" }}>
              Note
            </h3>
            <textarea
              type="text"
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              autoFocus
              className={classes.textarea}
              ref={handleInitialFocusRef} //callback function to set the initial focus node
              id="editNote"
              style={{ border: "2px solid #0075FF", borderRadius: "5px" }}
            />
          </div>
          <div
            style={{
              borderTop: "1px solid #ccc",
              marginTop: "10px",
              marginBottom: "0"
            }}
          />
          <div className={classes.buttonWrapper}>
            <button
              onClick={onCancel}
              className={clsx(
                classes.button,
                classes.contained,
                classes.cancelButton
              )}
              title="Cancel"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className={clsx(
                classes.button,
                classes.contained,
                classes.saveButton
              )}
              disabled={!textUpdated()}
              title="Save"
            >
              Save
            </button>
          </div>
        </div>
      </AriaModal>
    );
  }
  return modalContent;
};

/* eslint-enable no-unused-vars */

AdminNotesModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any,
  handleEdit: PropTypes.func,
  adminNotes: PropTypes.string,
  setAdminNotes: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  textUpdated: PropTypes.func,
  isNewNote: PropTypes.bool
};

export default AdminNotesModal;
