// Simple confirmation dialog built on top of Modal
// Used for delete confirmations and other destructive actions

import React from "react";
import Modal from "./Modal.jsx";

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Modal isOpen={isOpen} title={title} onClose={handleCancel}>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button className="btn btn-outline-secondary" onClick={handleCancel}>
          {cancelLabel}
        </button>
        <button className="btn btn-danger" onClick={handleConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

