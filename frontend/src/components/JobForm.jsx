// Reusable form component for creating and editing job applications
// Used by JobFormPage for both "add" and "edit" modes

import React, { useEffect, useState } from "react";

const initialState = {
  company: "",
  title: "",
  status: "Applied",
  dateApplied: "",
  notes: "",
};

const JobForm = ({ initialValues, onSubmit, submitting }) => {
  const [formValues, setFormValues] = useState(initialState);

  // When initialValues change (edit mode), populate the form
  useEffect(() => {
    if (initialValues) {
      setFormValues({
        company: initialValues.company || "",
        title: initialValues.title || "",
        status: initialValues.status || "Applied",
        // Convert ISO date to yyyy-mm-dd for date input
        dateApplied: initialValues.dateApplied
          ? initialValues.dateApplied.slice(0, 10)
          : "",
        notes: initialValues.notes || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="company">Company Name</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formValues.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Role / Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formValues.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateApplied">Date Applied</label>
          <input
            id="dateApplied"
            name="dateApplied"
            type="date"
            value={formValues.dateApplied}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formValues.notes}
          onChange={handleChange}
          placeholder="Interview details, follow-ups, recruiter info..."
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save Job"}
      </button>
    </form>
  );
};

export default JobForm;

