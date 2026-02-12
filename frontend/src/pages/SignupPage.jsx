// Signup page
// Allows new users to create an account

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup as signupRequest } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/Spinner.jsx";
import { useToast } from "../context/ToastContext.jsx";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const { addSuccess, addError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      const msg = "Name, email and password are required.";
      setError(msg);
      addError(msg);
      return;
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters.";
      setError(msg);
      addError(msg);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await signupRequest({ name, email, password });
      const { token, ...userData } = response.data;

      // Auto-login after successful signup
      login(userData, token);
      addSuccess("Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed. Please check your input.";
      setError(message);
      addError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            minLength={6}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Spinner /> : "Sign Up"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

