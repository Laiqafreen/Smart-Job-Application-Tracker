// Renders toast notifications in the corner of the screen

import React from "react";

const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => onDismiss(toast.id)}
        >
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

