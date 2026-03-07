import React, { useState, useEffect } from "react";

const AddService = () => {

  const [editingId] = useState(null);

  const [categories, setCategories] = useState([]);

  const [service, setService] = useState({
    categoryId: "",
    name: "",
    description: "",
    shapes: "",
    includes: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  // ===============================
  // FETCH CATEGORIES
  // ===============================
  useEffect(() => {
    fetch("http://localhost:5000/api/serviceCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setService({
      ...service,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {
    let err = {};

    if (!service.categoryId)
      err.categoryId = "Category required";

    if (!service.name.trim())
      err.name = "Service name required";

    if (!service.description.trim())
      err.description = "Description required";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  // ===============================
  // SUBMIT SERVICE
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

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

    try {

      const res = await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {

        alert("Service Added Successfully ✅");

        setService({
          categoryId: "",
          name: "",
          description: "",
          shapes: "",
          includes: "",
          isActive: true,
        });

        setErrors({});

      } else {
        alert(data.message || "Service Add Failed ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h4 className="mb-3 text-center">
          {editingId ? "Edit Service" : "Add Service"}
        </h4>

        <form onSubmit={handleSubmit}>

          {/* Category */}
          <select
            name="categoryId"
            value={service.categoryId}
            onChange={handleChange}
            className="form-control mb-2"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}

          </select>

          <small className="text-danger">{errors.categoryId}</small>

          {/* Service Name */}
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={service.name}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.name}</small>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Service Description"
            value={service.description}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <small className="text-danger">{errors.description}</small>

          {/* Shapes */}
          <input
            type="text"
            name="shapes"
            placeholder="Shapes (comma separated) e.g. U,V,Straight"
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

          {/* Active */}
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