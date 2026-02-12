// Auth routes
// Maps HTTP endpoints to controller functions for signup and login

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/signup - register a new user
router.post("/signup", registerUser);

// POST /api/auth/login - login existing user
router.post("/login", loginUser);

export default router;

