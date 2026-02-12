// Simple authentication context using React Context API
// Stores the current user and token and exposes helper functions

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user/token from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("sjt_user");
    const storedToken = localStorage.getItem("sjt_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // Login: save user and token to state + localStorage
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("sjt_user", JSON.stringify(userData));
    localStorage.setItem("sjt_token", jwtToken);
  };

  // Logout: clear state and localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sjt_user");
    localStorage.removeItem("sjt_token");
    navigate("/login");
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

