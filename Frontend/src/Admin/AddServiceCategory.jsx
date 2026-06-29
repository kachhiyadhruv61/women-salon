import React, { useState } from "react";
import { apiFetch } from "../utils/apiFetch";

const AddServiceCategory = () => {

  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true
  });

  const [errors, setErrors] = useState({});

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {

    let err = {};

    if (!category.name.trim())
      err.name = "Category name required";

    if (!category.slug.trim())
      err.slug = "Slug required";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  // ===============================
  // SUBMIT CATEGORY
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const payload = {
      ...category,
      createdAt: new Date()
    };

    try {

      const res = await apiFetch("/serviceCategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {

        alert("Category Added Successfully ✅");

        setCategory({
          name: "",
          slug: "",
          description: "",
          image: "",
          isActive: true
        });

        setErrors({});

      } else {
        alert(data.message || "Category Add Failed ❌");
      }

    } catch (error) {

      console.log(error);
      alert("Server Error ❌");

    }
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
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.name}</small>

          {/* Slug */}
          <input
            type="text"
            name="slug"
            placeholder="Slug (e.g. haircut)"
            value={category.slug}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.slug}</small>

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
