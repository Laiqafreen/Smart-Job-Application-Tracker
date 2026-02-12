// Job routes
// All routes here are protected and require a valid JWT token

import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
  getJobById,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(protect);

// GET /api/jobs - list all jobs for current user
// POST /api/jobs - create new job
router.route("/").get(getJobs).post(createJob);

// GET /api/jobs/stats/summary - simple dashboard stats
router.get("/stats/summary", getJobStats);

// GET /api/jobs/:id - get a single job (for editing)
// PUT /api/jobs/:id - update job
// DELETE /api/jobs/:id - delete job
router.route("/:id").get(getJobById).put(updateJob).delete(deleteJob);

export default router;

