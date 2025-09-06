import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import { Interweave } from "interweave";
import { MdLaunch, MdClose, MdEdit } from "react-icons/md";
import Quill from "../UI/Quill";
import Button from "../Button/Button";
import ModalDialog from "../UI/Modal";
import "react-quill/dist/quill.snow.css";
import "../../styles/AdminQuill.scss";
import WarningAdminNotesUnsavedChanges from "../Modals/WarningAdminNotesUnsavedChanges";
import useTooltipEditor from "../../hooks/useTooltipEditor";

const useStyles = createUseStyles(theme => ({
  accordionTooltipLabel: {
    ...theme.typography.paragraph1,
    color: theme.colorText,
    textAlign: "left",
    border: "1px solid " + theme.colors.secondary.gray,
    padding: "1rem",
    borderRadius: "5px",
    width: "min-content",
    minWidth: "97%",
    boxShadow:
      "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)",
    marginBottom: "10px",
    position: "relative"
  },
  closeButton: {
    color: theme.colors.secondary.gray,
    float: "right",
    marginTop: "-0.75rem",
    marginRight: "-0.750rem",
    fontSize: "20px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  triangle: {
    position: "relative",
    top: "0px",
    left: "20px",
    width: "0",
    height: "0",
    borderBottom: "6px solid " + theme.colors.secondary.gray,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  triangleInner: {
    position: "relative",
    top: "1px",
    left: "-6px",
    width: "0",
    height: "0",
    borderBottom: "6px solid white",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  disabledDescription: {
    color: "rgba(15, 41, 64, 0.6)"
  },
  editButton: {
    position: "absolute",
    bottom: "0.01rem",
    right: "0.40rem",
    fontSize: "20px",
    color: theme.colors.secondary.gray,
    "&:hover": {
      cursor: "pointer"
    }
  },
  modalContent: {
    padding: "1rem",
    width: "40vw",
    boxSizing: "border-box",
    "@media (max-width: 1024px)": {
      width: "85vw"
    },
    "@media (max-width: 768px)": {
      width: "90vw",
      padding: "0.75rem"
    },
    "@media (max-width: 480px)": {
      width: "95vw",
      padding: "0.5rem"
    }
  },
  modalTitle: {
    margin: "0 0 1rem 0",
    fontSize: "1.2rem",
    fontWeight: "bold"
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginTop: "1rem"
  }
}));

const AccordionToolTip = ({
  description,
  setShowDescription,
  disabledStyle,
  onEditDescription,
  id,
  forceEditMode
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const {
    isEditing,
    newDescription,
    // hasUnsavedChanges,
    showConfirmationModal,
    setNewDescription,
    handleSave,
    handleModalClose,
    handleCancel,
    handleConfirmDiscard,
    handleDoNotDiscard,
    startEditing
  } = useTooltipEditor(description, id, onEditDescription, forceEditMode);

  if (!description && !forceEditMode) {
    return null;
  }

  return (
    <>
      <div className={clsx(classes.triangle)}>
        <div className={clsx(classes.triangleInner)}></div>
      </div>

      {disabledStyle ? (
        <div
          className={clsx(
            classes.accordionTooltipLabel,
            classes.disabledDescription
          )}
        >
          <div
            className={clsx(classes.closeButton)}
            onClick={() => setShowDescription(prev => !prev)}
          >
            <MdClose />
          </div>
          <Interweave
            transform={(node, children) =>
              TransformExternalLink(node, children, classes)
            }
            content={newDescription}
          />
        </div>
      ) : (
        <div className={clsx(classes.accordionTooltipLabel)}>
          <div
            className={clsx(classes.closeButton)}
            onClick={() => setShowDescription(prev => !prev)}
          >
            <MdClose />
          </div>
          <Interweave
            transform={(node, children) =>
              TransformExternalLink(node, children, classes)
            }
            content={newDescription}
          />
          <div className={clsx(classes.editButton)} onClick={startEditing}>
            <MdEdit />
          </div>
        </div>
      )}

      <ModalDialog
        mounted={isEditing}
        onClose={handleModalClose}
        underlayClickExits={true}
        escapeExits={true}
        title="Edit tooltip"
      >
        <div className={clsx(classes.modalContent)}>
          <h3 className={clsx(classes.modalTitle)}>Edit tooltip</h3>
          <Quill value={newDescription} onChange={setNewDescription} />
          <div className={clsx(classes.modalButtons)}>
            <Button variant="secondary" onClick={handleCancel}>
              CANCEL
            </Button>
            <Button variant="primary" onClick={handleSave}>
              SAVE
            </Button>
          </div>
        </div>
      </ModalDialog>
      <WarningAdminNotesUnsavedChanges
        mounted={showConfirmationModal}
        handleDoNotDiscard={handleDoNotDiscard}
        handleConfirmDiscard={handleConfirmDiscard}
      />
    </>
  );
};

function TransformExternalLink(node, children, classes) {
  if (node.tagName == "A" && !node.getAttribute("href").startsWith("/")) {
    return (
      <span>
        <a href={node.getAttribute("href")} target="external">
          {children}
          <MdLaunch className={classes.externalLinkIcon} />
        </a>
      </span>
    );
  }
}

AccordionToolTip.propTypes = {
  description: PropTypes.string,
  setShowDescription: PropTypes.func,
  disabledStyle: PropTypes.any,
  onEditDescription: PropTypes.func,
  id: PropTypes.number,
  forceEditMode: PropTypes.bool
};

export default AccordionToolTip;
