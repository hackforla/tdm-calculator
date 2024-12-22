import React, { useRef, useState } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
// import ModalDialog from "../UI/AriaModal/ModalDialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { MdEdit } from "react-icons/md";
import AriaModal from "react-aria-modal";

const useStyles = createUseStyles(theme => ({
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
    paddingRight: "32px"
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
    padding: "14px 10px 14px 10px",
    boxSizing: "border-box"
  },
  editButton: {
    padding: "10px 20px",
    fontSize: "16px"
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

/* eslint-disable no-unused-vars */
const AdminNotesModal = ({
  //removed onSave and isEditing
  mounted,
  adminNotes,
  setAdminNotes,
  onCancel,
  onSave,
  handleEdit,
  isEditing
}) => {
  const classes = useStyles();
  const editButtonRef = useRef(null);
  const saveButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const textareaRef = useRef(null);

  const [initialFocusNode, setInitialFocusNode] = useState(null);

  const handleInitialFocusRef = node => {
    if (node) {
      setInitialFocusNode(node); // Assign the button node as the initial focus target
    }
  };

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

  const getApplicationNode = () => {
    return document.getElementById("body");
  };

  /* return (
    <AriaModal
      mounted={mounted}
      titleText="Admin Notes Modal"
      getApplicationNode={getApplicationNode}
      underlayClass={classes.modalContainer}
      dialogClass={classes.modalContent}
      includeDefaultStyles={false}
      verticallyCenter={true}
      underlayClickExits={false}
      escapeExits={false}
      initialFocus="#editButton"
    >
      <div className={classes.container}>
        <div className={classes.headerWrapper}>
          <h2
            id="modal-title"
            style={{
              fontWeight: "bold",
              margin: "0px",
              lineHeight: "32px",
              color: "#0f2940"}}
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
            id="editButton"
          >
            <>
              <MdEdit />
              EDIT NOTE
            </>
          </Button>
        </div>
      </div>
    </AriaModal>
  ); */

  let modalContent;
  if (adminNotes == "" && !isEditing) {
    // Add a new note
    modalContent = (
      <AriaModal
        mounted={mounted}
        titleText="Admin Notes Modal"
        getApplicationNode={getApplicationNode}
        underlayClass={classes.modalContainer}
        dialogClass={classes.modalContent}
        includeDefaultStyles={false}
        verticallyCenter={true}
        underlayClickExits={false}
        escapeExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        initialFocus={initialFocusNode || undefined}
      >
        <div className={classes.container}>
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
              className={classes.textarea}
              ref={handleInitialFocusRef} //callback function to set the initial focus node
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
              variant="outlined"
              onClick={onSave}
              style={{ margin: "0" }}
              id="saveButton"
              className={classes.saveButton}
              disabled={adminNotes.trim() === ""}
              title="Save Note"
              marginLeft="auto"
              marginRight="0"
            >
              SAVE
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
        </div>
      </AriaModal>
    );
  } else if (!isEditing) {
    // Viewing a note with option to edit
    modalContent = (
      <AriaModal
        mounted={mounted}
        titleText="View Note Modal"
        getApplicationNode={getApplicationNode}
        underlayClass={classes.modalContainer}
        dialogClass={classes.modalContent}
        includeDefaultStyles={false}
        verticallyCenter={true}
        underlayClickExits={false}
        escapeExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        initialFocus={initialFocusNode || undefined}
      >
        <div className={classes.container}>
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
            <Button
              color="colorPrimary"
              variant="contained"
              onClick={handleEdit}
              style={{ margin: "0" }}
              title="Edit Note"
              marginLeft="auto"
              marginRight="0"
              fontSize="16px"
              ref={handleInitialFocusRef} //callback function to set the initial focus node}
            >
              <MdEdit />
              EDIT NOTE
            </Button>
          </div>
        </div>
      </AriaModal>
    );
  } else {
    //editing a note
    modalContent = (
      <AriaModal
        mounted={mounted}
        titleText="View Note Modal"
        getApplicationNode={getApplicationNode}
        underlayClass={classes.modalContainer}
        dialogClass={classes.modalContent}
        includeDefaultStyles={false}
        verticallyCenter={true}
        underlayClickExits={false}
        escapeExits={false}
        underlayColor="rgba(0, 0, 0, 0.4)"
        initialFocus={initialFocusNode || undefined}
      >
        <div className={classes.container}>
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
              style={{ border: "1px solid blue" }}
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
              className={classes.cancelButton}
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
  isEditing: PropTypes.bool
};

export default AdminNotesModal;
