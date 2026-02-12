// Simple navigation bar shown on all pages
// Displays app name and login/signup or user + logout button

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          Smart Job Application Tracker
        </Link>
      </div>
      <nav className="navbar-right">
        {!isAuthenticated ? (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            )}
            {location.pathname !== "/signup" && (
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            )}
          </>
        ) : (
          <>
            <span className="navbar-user">Hi, {user?.name}</span>
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

