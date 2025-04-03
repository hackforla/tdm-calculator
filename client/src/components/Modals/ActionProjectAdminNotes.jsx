import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import ModalDialog from "../UI/Modal";

const useStyles = createUseStyles(theme => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    minWidth: "20rem",
    width: "40rem",
    minHeight: "25rem"
  },
  heading: {
    ...theme.typography.heading1,
    marginTop: "0",
    marginBottom: "0"
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
    justifyContent: "center",
    padding: "8px 10px 0px 10px",
    boxSizing: "border-box"
  }
}));

const AdminNotesModal = ({
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

  // if (!mounted) {
  //   return null; // Ensure the component is properly unmounted when `mounted` is false
  // }

  let modalContent;
  if (isNewNote) {
    // Add a new note - focus on the textarea, enable save button when there is text
    modalContent = (
      <ModalDialog
        mounted={mounted}
        title="Admin Notes Modal"
        onClose={onCancel}
        initialFocus={initialFocusId}
      >
        <div className={classes.contentContainer}>
          <h1 id="modal-title" className={classes.heading}>
            Add a New Note
          </h1>
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
      </ModalDialog>
    );
  } else if (!isEditing) {
    // Viewing a note with option to edit - textarea is read-only, focus on edit button
    modalContent = (
      <ModalDialog mounted={mounted} title="View Note Modal" onClose={onCancel}>
        <div className={classes.contentContainer}>
          <h1 id="modal-title" className={classes.heading}>
            View Note
          </h1>
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
              ref={() => handleInitialFocusRef({ id: "editButton" })}
              id="editButton"
            >
              EDIT NOTE
            </Button>
          </div>
        </div>
      </ModalDialog>
    );
  } else {
    //editing a note - focus on the textarea, add blue outline, enable save button when there is change
    modalContent = (
      <ModalDialog mounted={mounted} title="View Note Modal">
        <div className={classes.contentContainer}>
          <h1 id="modal-title" className={classes.heading}>
            Edit Note
          </h1>
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
      </ModalDialog>
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
