// Root component that defines application routes
// Uses React Router for navigation and ProtectedRoute for private pages

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import JobFormPage from "./pages/JobFormPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/new"
            element={
              <ProtectedRoute>
                <JobFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id/edit"
            element={
              <ProtectedRoute>
                <JobFormPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

