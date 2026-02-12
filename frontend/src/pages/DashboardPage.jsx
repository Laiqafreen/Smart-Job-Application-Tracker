// Dashboard page
// Shows live stats, charts, filters, and the list of job applications

import React, { useEffect, useMemo, useState } from "react";
import {
  deleteJob as deleteJobRequest,
  fetchJobStats,
  fetchJobs,
} from "../services/api.js";
import JobList from "../components/JobList.jsx";
import DashboardCards from "../components/DashboardCards.jsx";
import DashboardChart from "../components/DashboardChart.jsx";
import RecentApplications from "../components/RecentApplications.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Spinner from "../components/Spinner.jsx";
import { useToast } from "../context/ToastContext.jsx";

const DashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    statusCounts: { Applied: 0, Interview: 0, Rejected: 0, Offer: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state for filters/search/sort
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("dateDesc");

  // State for delete confirmation
  const [jobToDelete, setJobToDelete] = useState(null);

  const { addSuccess, addError } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsRes, statsRes] = await Promise.all([
        fetchJobs(),
        fetchJobStats(),
      ]);
      setJobs(jobsRes.data);
      setStats(statsRes.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Derived job list with filters + search + sort
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Filter by status
    if (statusFilter !== "All") {
      result = result.filter((job) => job.status === statusFilter);
    }

    // Search by company or role
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.company.toLowerCase().includes(query) ||
          job.title.toLowerCase().includes(query)
      );
    }

    // Sort by date applied
    result.sort((a, b) => {
      const da = a.dateApplied ? new Date(a.dateApplied) : new Date(0);
      const db = b.dateApplied ? new Date(b.dateApplied) : new Date(0);

      if (sortOrder === "dateAsc") {
        return da - db;
      }
      // default: newest first
      return db - da;
    });

    return result;
  }, [jobs, statusFilter, searchTerm, sortOrder]);

  const handleDeleteRequest = (job) => {
    setJobToDelete(job);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJobRequest(jobToDelete._id);
      addSuccess("Job deleted successfully");
      setJobToDelete(null);
      await loadData();
    } catch (err) {
      addError(err.response?.data?.message || "Failed to delete job.");
    }
  };

  const handleCancelDelete = () => {
    setJobToDelete(null);
  };

  if (loading) {
    return <Spinner message="Loading dashboard..." />;
  }

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <DashboardCards
        totalApplications={stats.totalApplications}
        statusCounts={stats.statusCounts}
      />

      {/* Filters / search / sort controls */}
      <div className="card filters-card">
        <div className="filters-row">
          <div className="form-group">
            <label htmlFor="statusFilter">Filter by status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="searchTerm">Search</label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Search by company or role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sortOrder">Sort by date</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="dateDesc">Newest first</option>
              <option value="dateAsc">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      <DashboardChart statusCounts={stats.statusCounts} />

      <RecentApplications jobs={jobs} />

      <JobList jobs={filteredJobs} onDelete={handleDeleteRequest} />

      <ConfirmDialog
        isOpen={!!jobToDelete}
        title="Delete job application?"
        message={
          jobToDelete
            ? `Are you sure you want to delete "${jobToDelete.title}" at ${jobToDelete.company}?`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default DashboardPage;

