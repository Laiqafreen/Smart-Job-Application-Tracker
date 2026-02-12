// Shows a small list of the most recent applications
// Helps students quickly see their latest activity

import React from "react";

const RecentApplications = ({ jobs }) => {
  if (!jobs.length) return null;

  const sorted = [...jobs].sort((a, b) => {
    const da = a.dateApplied ? new Date(a.dateApplied) : new Date(0);
    const db = b.dateApplied ? new Date(b.dateApplied) : new Date(0);
    return db - da;
  });

  const recent = sorted.slice(0, 5);

  return (
    <div className="card">
      <h2>Recent Applications</h2>
      <ul className="recent-list">
        {recent.map((job) => (
          <li key={job._id} className="recent-item">
            <div>
              <div className="recent-title">
                {job.title} <span className="muted">@ {job.company}</span>
              </div>
              <div className="recent-meta">
                <span className={`badge badge-${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
                <span className="recent-date">
                  {job.dateApplied
                    ? new Date(job.dateApplied).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentApplications;

