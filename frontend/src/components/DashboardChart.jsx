// DashboardChart
// Simple bar chart showing counts per status using Recharts

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = ({ statusCounts }) => {
  const data = [
    { name: "Applied", value: statusCounts.Applied || 0 },
    { name: "Interview", value: statusCounts.Interview || 0 },
    { name: "Rejected", value: statusCounts.Rejected || 0 },
    { name: "Offer", value: statusCounts.Offer || 0 },
  ];

  // If there is no data at all, avoid rendering an empty chart
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) {
    return (
      <div className="card">
        <h2>Status Overview</h2>
        <p className="muted">No applications yet. Add a job to see the chart.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Status Overview</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;

