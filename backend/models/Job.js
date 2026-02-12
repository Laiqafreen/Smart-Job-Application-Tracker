// Job model
// Represents a single job application linked to a specific user

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      // Reference to the User who owns this job application
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },
    dateApplied: {
      type: Date,
      required: [true, "Date applied is required"],
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;

