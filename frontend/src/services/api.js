// Small wrapper around Axios for talking to the backend API
// Automatically attaches JWT token (if present) to each request
// and handles common error cases (like expired tokens)

import axios from "axios";

// Base URL for the backend API (configurable via Vite env variable)
// In Vite, environment variables must start with VITE_
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create reusable Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sjt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors (e.g. expired tokens)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // If token is invalid/expired, log the user out gracefully
    if (status === 401) {
      localStorage.removeItem("sjt_user");
      localStorage.removeItem("sjt_token");

      // Redirect to login page if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const signup = (data) => apiClient.post("/auth/signup", data);
export const login = (data) => apiClient.post("/auth/login", data);

// Job endpoints
export const fetchJobs = () => apiClient.get("/jobs");
export const fetchJobStats = () => apiClient.get("/jobs/stats/summary");
export const fetchJobById = (id) => apiClient.get(`/jobs/${id}`);
export const createJob = (data) => apiClient.post("/jobs", data);
export const updateJob = (id, data) => apiClient.put(`/jobs/${id}`, data);
export const deleteJob = (id) => apiClient.delete(`/jobs/${id}`);

export default apiClient;


