// Page that wraps JobForm for both adding and editing jobs
// Decides mode based on presence of :id route parameter

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/JobForm.jsx";
import { createJob, fetchJobById, updateJob } from "../services/api.js";
import Spinner from "../components/Spinner.jsx";
import { useToast } from "../context/ToastContext.jsx";

const JobFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [initialJob, setInitialJob] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { addSuccess, addError } = useToast();

  // Load job when editing using dedicated GET /jobs/:id endpoint
  useEffect(() => {
    const loadJob = async () => {
      if (!isEditMode) return;
      try {
        setLoading(true);
        const res = await fetchJobById(id);
        setInitialJob(res.data);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load job. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, isEditMode]);

  const handleSubmit = async (values) => {
    // Simple front-end validation to help beginners
    if (!values.company.trim() || !values.title.trim()) {
      addError("Company and role are required.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      if (isEditMode) {
        await updateJob(id, values);
        addSuccess("Job updated successfully");
      } else {
        await createJob(values);
        addSuccess("Job created successfully");
      }
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to save job application. Please check your input.";
      setError(message);
      addError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner message="Loading job..." />;
  }

  return (
    <div className="page">
      <h1>{isEditMode ? "Edit Job Application" : "Add Job Application"}</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <JobForm
        initialValues={initialJob}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default JobFormPage;

