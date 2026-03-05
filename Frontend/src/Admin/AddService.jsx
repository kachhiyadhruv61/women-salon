import React, { useState } from "react";

const AddService = () => {
  const [editingId] = useState(null);

  const [service, setService] = useState({
    categoryId: "",
    name: "",
    description: "",
    shapes: "",
    includes: "",
    isActive: true,
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

    const payload = {
      categoryId: service.categoryId,
      name: service.name,
      description: service.description,
      shapes: service.shapes
        ? service.shapes.split(",").map((s) => s.trim())
        : [],
      includes: service.includes
        ? service.includes.split(",").map((i) => i.trim())
        : [],
      isActive: service.isActive,
      createdAt: new Date(),
    };

    console.log("Service Saved:", payload);

    // API call here
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3 text-center">
          {editingId ? "Edit Service" : "Add Service"}
        </h4>

        <form onSubmit={handleSubmit}>

          {/* Category */}
          <input
            type="text"
            name="categoryId"
            placeholder="Category ID"
            value={service.categoryId}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          {/* Service Name */}
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={service.name}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Service Description"
            value={service.description}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Shapes */}
          <input
            type="text"
            name="shapes"
            placeholder="Shapes (comma separated) e.g. U, V, Straight"
            value={service.shapes}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Includes */}
          <input
            type="text"
            name="includes"
            placeholder="Includes (comma separated)"
            value={service.includes}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Active Toggle */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="isActive"
              checked={service.isActive}
              onChange={handleChange}
              className="form-check-input"
              id="activeCheck"
            />
            <label className="form-check-label" htmlFor="activeCheck">
              Active Service
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update Service" : "Add Service"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddService;