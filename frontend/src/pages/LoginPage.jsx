// Login page
// Allows existing users to log in and stores JWT token on success

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login as loginRequest } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/Spinner.jsx";
import { useToast } from "../context/ToastContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addSuccess, addError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      addError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginRequest({ email, password });
      const { token, ...userData } = response.data;

      // Save user + token via context
      login(userData, token);
      addSuccess("Logged in successfully");

      // Redirect back to the page the user wanted, or to dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      addError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

