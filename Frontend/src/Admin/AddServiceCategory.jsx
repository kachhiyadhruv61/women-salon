import React, { useState } from "react";

const AddServiceCategory = () => {

  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...category,
      createdAt: new Date()
    };

    console.log("Category Saved:", payload);

    // API call here
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h4 className="text-center mb-4">Add Service Category</h4>

        <form onSubmit={handleSubmit}>

          {/* Category Name */}
          <input
            type="text"
            name="name"
            placeholder="Category Name (e.g. Haircut)"
            value={category.name}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          {/* Slug */}
          <input
            type="text"
            name="slug"
            placeholder="Slug (e.g. haircut)"
            value={category.slug}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Category Description"
            value={category.description}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={category.image}
            onChange={handleChange}
            className="form-control mb-3"
          />

          {/* Active Checkbox */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="isActive"
              checked={category.isActive}
              onChange={handleChange}
              className="form-check-input"
              id="activeCheck"
            />
            <label className="form-check-label" htmlFor="activeCheck">
              Active Category
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Category
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddServiceCategory;