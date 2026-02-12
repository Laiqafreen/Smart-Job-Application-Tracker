// Simple seed script to insert sample users and jobs
// Run with: npm run seed

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Job from "../models/Job.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing collections to avoid duplicates
    await User.deleteMany();
    await Job.deleteMany();

    // Create a sample user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const user = await User.create({
      name: "Test Student",
      email: "student@example.com",
      password: hashedPassword,
    });

    // Create some sample jobs for this user
    const jobs = [
      {
        user: user._id,
        company: "TechCorp",
        title: "Frontend Intern",
        status: "Applied",
        dateApplied: new Date("2025-12-01"),
        notes: "Applied via campus portal.",
      },
      {
        user: user._id,
        company: "InnovateX",
        title: "Full-Stack Developer",
        status: "Interview",
        dateApplied: new Date("2025-12-05"),
        notes: "Technical interview scheduled next week.",
      },
      {
        user: user._id,
        company: "StartupHub",
        title: "Backend Engineer",
        status: "Rejected",
        dateApplied: new Date("2025-11-20"),
        notes: "Got a polite rejection email.",
      },
    ];

    await Job.insertMany(jobs);

    console.log("Sample data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();

