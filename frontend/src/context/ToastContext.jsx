// Toast notification system
// Provides a simple way to show success/error/info messages from anywhere

import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer.jsx";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, duration = 3000) => {
    const id = ++toastIdCounter;
    const toast = { id, type, message };

    setToasts((prev) => [...prev, toast]);

    // Auto-remove after `duration` ms
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    addSuccess: (msg, duration) => addToast("success", msg, duration),
    addError: (msg, duration) => addToast("error", msg, duration),
    addInfo: (msg, duration) => addToast("info", msg, duration),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

