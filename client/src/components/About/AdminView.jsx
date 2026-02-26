import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { MdDelete, MdLaunch } from "react-icons/md";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Button from "components/Button/Button";
import { MdEdit, MdViewModule, MdCheck, MdAdd } from "react-icons/md";
import { jssTheme as theme } from "styles/theme";
import { Interweave } from "interweave";
import DeleteAboutItemModal from "components/Modals/WarningAboutDelete";
import { QuillEditor } from "components/UI/QuillEditor";

const useStyles = createUseStyles({
  aboutContent: {
    maxWidth: "1200px", // Increased width for better layout
    margin: "0 auto"
  },
  linklist: {
    marginBottom: "0.8em"
  },
  externalLinkIcon: {
    fontSize: "14px",
    padding: " 0 0.4em",
    color: "#00F"
  },
  answerInput: {
    width: "100%",
    display: "flex",
    fontSize: "16px",
    flexDirection: "column",
    "& .ql-editor ol, & .ql-editor ul": {
      fontSize: "16px"
    },
    "& .ql-editor li": {
      fontSize: "16px"
    }
  },
  contentWithOptions: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "3rem" // Increased gap for better spacing
  },
  aboutItem: {
    marginBottom: "2.5rem", // Increased margin
    padding: "2rem", // Increased padding
    borderRadius: "12px", // Slightly more rounded corners
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Enhanced shadow
    border: "1px solid #e0e0e0",
    transition: "all 0.2s ease-in-out"
  },
  aboutItemDragging: {
    border: "2px solid #a6c439",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)", // Enhanced shadow when dragging
    transform: "scale(1.02)" // Slight scale effect when dragging
  },
  controlButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem", // Increased gap between buttons
    minWidth: "140px", // Slightly wider for better appearance
    alignItems: "center"
  },
  controlButton: {
    minWidth: "48px",
    minHeight: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }
  },
  dragHandle: {
    cursor: "grab",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    transition: "all 0.2s ease-in-out",
    minWidth: "48px",
    minHeight: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#e9e9e9",
      borderColor: "#bbb"
    },
    "&:active": {
      cursor: "grabbing",
      backgroundColor: "#ddd"
    }
  },
  cancelButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  addButtonContainer: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center"
  },
  addButton: {
    minHeight: "50px",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }
  },
  editableContent: {
    cursor: "pointer",
    minHeight: "3rem",
    padding: "0.75rem",
    borderRadius: "6px",
    transition: "background-color 0.2s ease-in-out",
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#e9ecef"
    }
  },
  editableTitle: {
    cursor: "pointer",
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "6px",
    transition: "background-color 0.2s ease-in-out",
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#e9ecef"
    }
  },
  titleInput: {
    width: "100%",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    padding: "0.75rem",
    border: "2px solid #a6c439",
    borderRadius: "6px",
    backgroundColor: "#fff",
    outline: "none",
    transition: "border-color 0.2s ease-in-out",
    "&:focus": {
      borderColor: "#8bc34a",
      boxShadow: "0 0 0 3px rgba(166, 196, 57, 0.1)"
    }
  },
  quillContainer: {
    border: "2px solid #a6c439",
    borderRadius: "6px",
    overflow: "hidden",
    "& .ql-toolbar": {
      borderBottom: "1px solid #a6c439"
    },
    "& .ql-container": {
      border: "none"
    }
  }
});

const AdminView = ({ aboutList, setAboutList }) => {
  const [editingItems, setEditingItems] = useState({});
  const [showDeleteAboutItemModal, setShowDeleteAboutItemModal] =
    useState(false);
  const classes = useStyles();

  if (!aboutList || aboutList?.length === 0) {
    return (
      <div className={classes.addButtonContainer}>
        <Button
          variant="contained"
          color="colorPrimary"
          onClick={addNewAboutItem}
          id="add-about-item"
          data-testid="add-about-item"
          className={classes.addButton}
        >
          <MdAdd style={{ marginRight: "0.5rem" }} />
          Add New About Block
        </Button>
      </div>
    );
  }

  const updateAboutItem = (id, field, value) => {
    setAboutList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const toggleEditing = (id, field) => {
    setEditingItems(prev => ({
      ...prev,
      [`${id}-${field}`]: !prev[`${id}-${field}`]
    }));
  };

  const deleteAboutItem = id => {
    setAboutList(prevList => prevList.filter(item => item.id !== id));
  };

  const addNewAboutItem = () => {
    // Calculate the next display order by finding the highest existing displayOrder and adding 10
    const maxDisplayOrder =
      aboutList.length > 0
        ? Math.max(...aboutList.map(item => item.displayOrder || 0))
        : 0;

    // Generate a temporary negative ID for new items (database will assign real IDs)
    const tempId = -Date.now();

    const newItem = {
      id: tempId,
      title: "New About Section",
      content: "<p>Enter your content here...</p>",
      displayOrder: maxDisplayOrder + 10
    };

    setAboutList(prevList => [...prevList, newItem]);

    // Automatically start editing both title and content for the new item
    setEditingItems(prev => ({
      ...prev,
      [`${tempId}-title`]: true,
      [`${tempId}-content`]: true
    }));
  };

  return (
    <>
      <Droppable droppableId="about-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {aboutList.map((about, index) => (
              <Draggable
                key={about.id}
                draggableId={`about-${about.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${classes.aboutItem} ${
                      snapshot.isDragging ? classes.aboutItemDragging : ""
                    }`}
                  >
                    <div className={classes.contentWithOptions}>
                      <div style={{ flex: 1 }}>
                        {/* Title Section */}
                        {editingItems[`${about.id}-title`] ? (
                          <input
                            type="text"
                            value={about.title}
                            onChange={e =>
                              updateAboutItem(about.id, "title", e.target.value)
                            }
                            onBlur={() => toggleEditing(about.id, "title")}
                            className={classes.titleInput}
                            autoFocus
                          />
                        ) : (
                          <h3
                            onClick={() => toggleEditing(about.id, "title")}
                            className={classes.editableTitle}
                          >
                            {about.title}
                          </h3>
                        )}

                        {/* Content Section */}
                        {editingItems[`${about.id}-content`] ? (
                          <div className={classes.quillContainer}>
                            <QuillEditor
                              value={about.content}
                              onChange={value =>
                                updateAboutItem(about.id, "content", value)
                              }
                              placeholder="Content"
                              className={classes.answerInput}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => toggleEditing(about.id, "content")}
                            className={classes.editableContent}
                          >
                            <Interweave
                              transform={TransformExternalLink}
                              content={about.content}
                            />
                          </div>
                        )}
                      </div>

                      {/* Control Buttons */}
                      <div className={classes.controlButtons}>
                        <Button
                          variant="outlined"
                          onClick={() => toggleEditing(about.id, "title")}
                          id={`edit-about-title-${about.id}`}
                          data-testid={`edit-about-title-${about.id}`}
                          title={
                            editingItems[`${about.id}-title`]
                              ? "Finish editing title"
                              : "Edit title"
                          }
                          className={classes.controlButton}
                          style={{
                            backgroundColor: editingItems[`${about.id}-title`]
                              ? "#e8f5e8"
                              : "white",
                            borderColor: editingItems[`${about.id}-title`]
                              ? "#4caf50"
                              : "#ccc"
                          }}
                        >
                          {editingItems[`${about.id}-title`] ? (
                            <MdCheck color="#4caf50" />
                          ) : (
                            <MdEdit color={theme.colorText} />
                          )}
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => toggleEditing(about.id, "content")}
                          id={`edit-about-content-${about.id}`}
                          data-testid={`edit-about-content-${about.id}`}
                          title={
                            editingItems[`${about.id}-content`]
                              ? "Finish editing content"
                              : "Edit content"
                          }
                          className={classes.controlButton}
                          style={{
                            backgroundColor: editingItems[`${about.id}-content`]
                              ? "#e8f5e8"
                              : "white",
                            borderColor: editingItems[`${about.id}-content`]
                              ? "#4caf50"
                              : "#ccc"
                          }}
                        >
                          {editingItems[`${about.id}-content`] ? (
                            <MdCheck color="#4caf50" />
                          ) : (
                            <MdEdit color={theme.colorText} />
                          )}
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => setShowDeleteAboutItemModal(true)}
                          id={`delete-about-${about.id}`}
                          data-testid={`delete-about-${about.id}`}
                          title="Delete item"
                          className={classes.controlButton}
                        >
                          <MdDelete color={theme.colorCritical} />
                        </Button>
                        <DeleteAboutItemModal
                          isModalOpen={showDeleteAboutItemModal}
                          cancel={() => setShowDeleteAboutItemModal(false)}
                          handleDelete={() => {
                            deleteAboutItem(about.id);
                            setShowDeleteAboutItemModal(false);
                          }}
                        />

                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className={classes.dragHandle}
                          title="Drag to reorder"
                        >
                          <MdViewModule color={theme.colors.secondary.gray} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={classes.addButtonContainer}>
        <Button
          variant="contained"
          color="colorPrimary"
          onClick={addNewAboutItem}
          id="add-about-item"
          data-testid="add-about-item"
          className={classes.addButton}
        >
          <div
            className="add-btn"
            style={{ display: "flex", alignItems: "center" }}
          >
            <MdAdd style={{ marginRight: "0.5rem" }} />
            Add New About Block
          </div>
        </Button>
      </div>
    </>
  );
};

export default AdminView;

function TransformExternalLink(node, children) {
  const classes = useStyles();
  if (node.tagName == "A" && !node.getAttribute("href").startsWith("/")) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
    return (
      <span>
        <a href={node.getAttribute("href")} target="external">
          {children}
          <MdLaunch className={classes.externalLinkIcon} />
        </a>
      </span>
    );
  } else {
    node.removeAttribute("target");
    node.removeAttribute("rel");
  }
}

AdminView.propTypes = {
  aboutList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ),
  setAboutList: PropTypes.func.isRequired
};
