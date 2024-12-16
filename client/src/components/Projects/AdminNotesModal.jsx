import React, { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateRows: "auto 1fr", // 'auto' for the header, '1fr' for the flexible space for the textarea
    width: "100%",
    height: "100%", // Ensure it takes full height of the parent
    boxSizing: "border-box"
  },
  // Header section
  header: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    boxSizing: "border-box"
  },
  // Textarea wrapper that will fill the remaining space
  textareaWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    height: "100%",
    overflow: "hidden"
  },
  textarea: {
    width: "100%",
    height: "100%",
    padding: "8px", // Optional padding for the textarea
    resize: "none",
    boxSizing: "border-box" // Ensure padding is included in height calculation
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end", // Align the button to the right
    padding: "10px",
    boxSizing: "border-box"
  },
  editButton: {
    padding: "10px 20px",
    fontSize: "16px"
  },
  buttonFlexBox: {
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
  mounted,
  adminNotes,
  setAdminNotes,
  onCancel,
  onSave,
  onEdit,
  isEditing,
  setIsEditing
}) => {
  const classes = useStyles();
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);
  // Use ResizeObserver to adjust the height based on container width
  useEffect(() => {
    // Create a local variable to store the current container ref
    const containerElement = containerRef.current;

    // Define the ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        // Maintain 16:9 aspect ratio (height = 9/16 of width)
        const newHeight = (width * 9) / 16;
        setHeight(newHeight);
      }
    });

    // Start observing the container element
    if (containerElement) {
      resizeObserver.observe(containerElement);
    }

    // Cleanup function to unobserve when the component is unmounted or dependencies change
    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement);
      }
    };
  }, []); // Empty dependency array means this effect runs once when component mounts

  let modalContent;
  if (adminNotes == "" && !isEditing) {
    // Add a new note
    modalContent = (
      <ModalDialog
        mounted={mounted}
        underlayClickExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        escapeExits={false}
        initialFocus="#saveButton"
        onClose={onCancel}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            Add a New Note
          </div>
          <textarea
            value={adminNotes}
            onChange={e => setAdminNotes(e.target.value)}
            autoFocus
            className={classes.adminNoteInput}
          />
          <Button
            onClick={onSave}
            className={classes.saveButton}
            id="saveButton"
            variant="outlined"
            disabled={adminNotes.trim() === ""}
            title="Save Note"
            marginLeft="auto"
            marginRight="0"
          >
            Save
          </Button>
          <Button
            onClick={() => onCancel("none")}
            id="cancelButton"
            className={classes.cancelButton}
            title="Cancel"
          >
            Cancel
          </Button>
        </div>
      </ModalDialog>
    );
  } else if (!isEditing) {
    // Viewing a note with option to edit
    modalContent = (
      <ModalDialog
        mounted={mounted}
        underlayClickExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        escapeExits={false}
      >
        <div className={classes.container} ref={containerRef}>
          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            View Note
          </div>
          <div
            className={classes.textareaWrapper}
            style={{ height: `${height}px` }}
          >
            <textarea
              type="text"
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              autoFocus
              className={classes.textarea}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button
              onClick={() => setIsEditing(true)}
              className={classes.editButton}
              disabled={false}
              title="Edit Note"
            >
              Edit Note
            </button>
          </div>
        </div>
      </ModalDialog>
    );
  } else {
    //editing a note
    modalContent = (
      <ModalDialog
        mounted={mounted}
        underlayClickExits={false}
        escapeExits={false}
        initialFocus="#saveButton"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            Edit Note
          </div>
          <textarea
            type="text"
            value={adminNotes}
            onChange={e => setAdminNotes(e.target.value)}
            autoFocus
            className={classes.adminNoteInput}
          />
          <button
            onClick={onCancel}
            className={classes.cancelButton}
            disabled={adminNotes.trim() === ""}
            title="Cancel"
          >
            Cancel
          </button>
          <button
            onClick={onEdit}
            className={classes.cancelButton}
            disabled={adminNotes.trim() === ""}
            title="Save"
          >
            Save
          </button>
        </div>
      </ModalDialog>
    );
  }
  return modalContent;
};

AdminNotesModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};

export default AdminNotesModal;
