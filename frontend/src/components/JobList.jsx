// Displays a table of job applications with edit and delete actions
// Parents pass in the jobs data and callbacks for edit/delete

import React from "react";
import { Link } from "react-router-dom";

const JobList = ({ jobs, onDelete }) => {
  if (!jobs.length) {
    return (
      <div className="card empty-state">
        <div className="empty-illustration" />
        <h2>No job applications yet</h2>
        <p className="muted">
          Start tracking your search by adding your first application.
        </p>
        <Link to="/jobs/new" className="btn btn-primary">
          + Add Job
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Job Applications</h2>
        <Link to="/jobs/new" className="btn btn-primary">
          + Add Job
        </Link>
      </div>

      <div className="table-wrapper">
        <table className="job-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role / Title</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.title}</td>
                <td>
                  <span className={`badge badge-${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
                <td>{job.dateApplied?.slice(0, 10)}</td>
                <td className="notes-cell">{job.notes}</td>
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/jobs/${job._id}/edit`}
                      className="btn btn-sm btn-outline"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(job)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;

