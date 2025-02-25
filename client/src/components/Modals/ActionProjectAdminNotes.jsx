import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { MdOutlineClose } from "react-icons/md";
import AriaModal from "react-aria-modal";

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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    // height: "auto",
    boxSizing: "border-box",
    maxWidth: "67.5rem",
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
    readonly: "true",
    flexGrow: 1,
    resize: "none",
    maxHeight: "414px",
    overflowY: "auto"
  },
  blueBorderOnFocus: {
    width: "100%"
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "14px 10px 14px 10px",
    boxSizing: "border-box"
  },
  heading1: theme.typography.heading1
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

  // Cleanup on unmount to prevent issues with stale initialFocusId
  useEffect(() => {
    if (!mounted) {
      setInitialFocusId(""); // Reset the id when the component unmounts
    }
    return () => {
      setInitialFocusId(""); // Reset the id when the component unmounts
    };
  }, [mounted]);

  if (!mounted) {
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
            <MdOutlineClose onClick={onCancel} aria-label="Close" />
          </div>
          <div
            style={{ borderTop: "1px solid #ccc", margin: "8px 0px 0px 0px" }}
          />
          <div className={classes.textareaWrapper}>
            <h3 className={classes.subHeader} style={{ fontWeight: "normal" }}>
              Note
            </h3>
            <textarea
              style={{
                border: "1px solid #0075FF",
                outline: "1px solid #0075FF",
                borderRadius: "5px"
              }}
              type="text"
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              autoFocus
              className={classes.textarea}
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
              variant="secondary"
              onClick={onCancel}
              id="cancelButton"
              title="Cancel"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={onSave}
              id="saveButton"
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
            <MdOutlineClose onClick={onCancel} aria-label="Close" />
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
            <Button
              onClick={handleEdit}
              variant="primary"
              title="Edit Note"
              ref={handleInitialFocusRef}
              id="editButton"
              color="#A7C539"
            >
              EDIT NOTE
            </Button>
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
            <MdOutlineClose onClick={onCancel} aria-label="Close" />
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
              style={{
                border: "1px solid #0075FF",
                outline: "1px solid #0075FF",
                borderRadius: "5px"
              }}
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
            <Button onClick={onCancel} variant="secondary" title="Cancel">
              Cancel
            </Button>
            <Button
              onClick={onSave}
              variant="primary"
              disabled={!textUpdated()}
              title="Save"
            >
              Save
            </Button>
          </div>
        </div>
      </AriaModal>
    );
  }
  return modalContent;
};

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
