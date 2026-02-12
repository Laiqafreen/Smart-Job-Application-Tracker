// Entry point of the backend API server
// Sets up Express app, connects to MongoDB, and mounts routes

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(cors()); // Allow cross-origin requests (frontend <-> backend)
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests (useful in development)

// Simple health check route
app.get("/", (req, res) => {
  res.json({ message: "Smart Job Application Tracker API is running" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// 404 handler for unknown endpoints
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

