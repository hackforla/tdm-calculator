import { useState, useEffect, useCallback } from "react";
import { updateDescription } from "../services/calculation.service";

const useTooltipEditor = (
  description,
  id,
  onEditDescription,
  forceEditMode
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    setNewDescription(description);
  }, [description]);

  useEffect(() => {
    setHasUnsavedChanges(newDescription !== description);
  }, [newDescription, description]);

  useEffect(() => {
    if (forceEditMode) {
      setIsEditing(true);
    }
  }, [forceEditMode]);

  const handleSave = useCallback(async () => {
    try {
      const isEmpty =
        !newDescription ||
        newDescription.trim() === "" ||
        newDescription.trim() === "<p><br></p>" ||
        newDescription.trim() === "<p></p>";

      const descriptionToSave = isEmpty ? "" : newDescription;

      await updateDescription(id, descriptionToSave);

      if (onEditDescription) {
        onEditDescription(descriptionToSave);
      }
      setIsEditing(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  }, [id, newDescription, onEditDescription]);

  const handleCancel = useCallback(() => {
    setNewDescription(description);
    setIsEditing(false);
    setHasUnsavedChanges(false);
  }, [description]);

  const handleModalClose = useCallback(() => {
    if (hasUnsavedChanges) {
      setShowConfirmationModal(true);
    } else {
      handleCancel();
    }
  }, [hasUnsavedChanges, handleCancel]);

  const handleConfirmDiscard = useCallback(() => {
    setShowConfirmationModal(false);
    handleCancel();
  }, [handleCancel]);

  const handleDoNotDiscard = useCallback(() => {
    setShowConfirmationModal(false);
  }, []);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  return {
    isEditing,
    newDescription,
    hasUnsavedChanges,
    showConfirmationModal,
    setNewDescription,
    handleSave,
    handleModalClose,
    handleCancel,
    handleConfirmDiscard,
    handleDoNotDiscard,
    startEditing
  };
};

export default useTooltipEditor;
