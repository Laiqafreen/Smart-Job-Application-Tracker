// Generic modal component used for editing jobs and confirmations
// Renders children in a centered card with a backdrop

import React from "react";

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Close only when clicking directly on the backdrop
    if (e.target.classList.contains("modal-backdrop")) {
      onClose?.();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

