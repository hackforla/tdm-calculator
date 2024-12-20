import React from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { MdEdit } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  "@global": {
    "#adminNotesDialog > #react-aria-modal-dialog": {
      color: "red"
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // height: "auto",
    boxSizing: "border-box"
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "10px",
    marginTop: "5px"
  },
  subHeader: {
    fontSize: "18px",
    textAlign: "left",
    marginBottom: "0"
  },
  textareaWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  textarea: {
    width: "100%",
    height: "100%",
    padding: "8px",
    boxSizing: "border-box"
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
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
  handleEdit,
  isEditing
}) => {
  const classes = useStyles();
  /*   const [height, setHeight] = useState(0); // Track height based on width
  const containerRef = useRef(null); // Reference for the container */

  // // Use `useLayoutEffect` to make sure containerRef is set before observing
  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     /* eslint-disable no-console */
  //     console.log(
  //       "useLayoutEffect: containerRef.current is",
  //       containerRef.current
  //     );
  //     console.log("useLayoutEffect: adminNotes is", adminNotes);
  //     console.log("useLayoutEffect: isEditing", isEditing);

  //     const resizeObserver = new ResizeObserver(entries => {
  //       for (let entry of entries) {
  //         const width = entry.contentRect.width;
  //         const newHeight = (width * 9) / 16; // Maintain 16:9 aspect ratio
  //         console.log(`Element width: ${width}px, new height: ${newHeight}px`);
  //         setHeight(newHeight); // Update height based on width
  //       }
  //     });

  //     if (containerRef.current) {
  //       resizeObserver.observe(containerRef.current); // Observe the container
  //     } else {
  //       console.log("Container reference is still null");
  //     }

  //     // Cleanup function to unobserve when the component is unmounted or dependencies change
  //     return () => {
  //       if (containerRef.current) {
  //         resizeObserver.unobserve(containerRef.current);
  //       }
  //     };
  //   }, 0); // Set a timeout with 0 delay to give React time to reconcile the ref
  // }, [isEditing, adminNotes]); // Empty dependency array, ensuring this runs only once on mount

  // useEffect(() => {
  //   console.log("useEffect: adminNotes is", adminNotes);
  // }, [isEditing, adminNotes]); // Only run once on mount

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
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <div
            className={classes.header}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            Add a New Note
          </div>
          <textarea
            value={adminNotes}
            onChange={e => setAdminNotes(e.target.value)}
            autoFocus
            className={classes.adminNoteInput}
            id="adminNotesTextarea"
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
        titleText="View Note"
      >
        {/*         <div
          className={classes.container}
          ref={containerRef}
          style={{ height: `${height}px` }}
        > */}
        <div className={classes.container} id="adminNotesDialogContainer">
          <div className={classes.headerWrapper}>
            <h2 id="modal-title" style={{ fontWeight: "bold", margin: "0px" }}>
              View Note
            </h2>
            <CloseOutlinedIcon onClick={onCancel} aria-label="Close" />
          </div>
          <div style={{ borderTop: "1px solid #ccc", margin: "5px 0" }} />
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
              id="adminNotesTextarea"
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
              color="colorPrimary"
              variant="contained"
              onClick={handleEdit}
              style={{ margin: "0" }}
            >
              <>
                <MdEdit />
                EDIT NOTE
              </>
            </Button>
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
            onClick={onSave}
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
  project: PropTypes.any,
  handleEdit: PropTypes.func,
  adminNotes: PropTypes.string,
  setAdminNotes: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onEdit: PropTypes.func,
  isEditing: PropTypes.bool
};

export default AdminNotesModal;
