// Simple loading spinner used across the app
// Keeps loading states consistent and easy to change in one place

import React from "react";

const Spinner = ({ message }) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;

