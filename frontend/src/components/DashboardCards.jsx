// Small presentational component that shows high level dashboard stats

import React from "react";

const DashboardCards = ({ totalApplications, statusCounts }) => {
  return (
    <div className="dashboard-grid">
      <div className="card stat-card">
        <h3>Total Applications</h3>
        <p className="stat-number">{totalApplications}</p>
      </div>
      <div className="card stat-card">
        <h3>Applied</h3>
        <p className="stat-number">{statusCounts.Applied}</p>
      </div>
      <div className="card stat-card">
        <h3>Interview</h3>
        <p className="stat-number">{statusCounts.Interview}</p>
      </div>
      <div className="card stat-card">
        <h3>Rejected</h3>
        <p className="stat-number">{statusCounts.Rejected}</p>
      </div>
      <div className="card stat-card">
        <h3>Offer</h3>
        <p className="stat-number">{statusCounts.Offer}</p>
      </div>
    </div>
  );
};

export default DashboardCards;

