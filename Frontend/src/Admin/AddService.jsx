import React, { useState } from "react";

const AddService = () => {
  const [editingId] = useState(null);

  const [service, setService] = useState({
    name: "",
    duration: "",
    amount: "",
    staff: "",
    fishTankTherapy: false,
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setService({
      ...service,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Saved:", service);

    // API call or state save logic here
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3 text-center">
          {editingId ? "Edit Service" : "Add Service"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={service.name}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 60 mins)"
            value={service.duration}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount (₹)"
            value={service.amount}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="text"
            name="staff"
            placeholder="Staff Assigned (comma separated)"
            value={service.staff}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="fishTankTherapy"
              checked={service.fishTankTherapy}
              onChange={handleChange}
              className="form-check-input"
              id="fishTank"
            />
            <label className="form-check-label" htmlFor="fishTank">
              Fish Tank Pedicure Therapy
            </label>
          </div>

          <select
            name="status"
            value={service.status}
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
