// Job controller
// Contains logic for CRUD operations on job applications

import Job from "../models/Job.js";

// @desc    Get all jobs for logged-in user
// @route   GET /api/jobs
// @access  Private
export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single job (used when editing a job by id)
// @route   GET /api/jobs/:id
// @access  Private
export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    // Ensure the job exists and belongs to the authenticated user
    const job = await Job.findOne({ _id: jobId, user: req.user._id });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res, next) => {
  try {
    const { company, title, status, dateApplied, notes } = req.body;

    // Basic validation
    if (!company || !title || !dateApplied) {
      return res
        .status(400)
        .json({ message: "Company, title and date applied are required" });
    }

    // Optional: validate status against allowed values for clearer errors
    const allowedStatuses = ["Applied", "Interview", "Rejected", "Offer"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const job = await Job.create({
      user: req.user._id,
      company,
      title,
      status: status || "Applied",
      dateApplied,
      notes: notes || "",
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing job
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    // Find job and ensure it belongs to this user
    const job = await Job.findOne({ _id: jobId, user: req.user._id });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { company, title, status, dateApplied, notes } = req.body;

    // Validate status if provided
    const allowedStatuses = ["Applied", "Interview", "Rejected", "Offer"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update allowed fields
    job.company = company ?? job.company;
    job.title = title ?? job.title;
    job.status = status ?? job.status;
    job.dateApplied = dateApplied ?? job.dateApplied;
    job.notes = notes ?? job.notes;

    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findOneAndDelete({
      _id: jobId,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats for current user
// @route   GET /api/jobs/stats/summary
// @access  Private
export const getJobStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalApplications = await Job.countDocuments({ user: userId });

    // Count by status using aggregation
    const statusAggregation = await Job.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0,
    };

    statusAggregation.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    res.json({
      totalApplications,
      statusCounts,
    });
  } catch (error) {
    next(error);
  }
};

