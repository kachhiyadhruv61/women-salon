import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch";

const AddStaff = () => {
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
    experience: "",
    specialization: "",
    salary: "",
    joiningDate: "",
    status: "Active",
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };
  // IMAGE PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStaff({ ...staff, image: file });

      // PREVIEW
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // FORM DATA
      const formData = new FormData();
      Object.keys(staff).forEach((key) => {
        formData.append(key, staff[key]);
      });


      const res = await apiFetch("/staff", {
        method: "POST",
        body: formData,   // 🔥 multer doesn't work with JSON, so we send formData directly
      });

      const data = await res.json();

      if (data.success) {
        alert("Staff Added Successfully ✅");

        // 🔥 redirect to staff list page
        navigate("/staffs");
      } else {
        alert("Failed to add staff");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-3 text-center">Add Staff</h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* IMAGE INPUT */}
        <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* PREVIEW */}
          {preview && (
            <img src={preview} 
            alt="Preview" 
            width="100"
            className="mb-3 rounded"
            />
          )}
          
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            value={staff.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="E-mail"
            value={staff.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            name="phone"
            placeholder="Mobile Number"
            value={staff.phone}
            onChange={handleChange}
            required
          />

          <select 
            className="form-control mb-3"
            name="gender"
            value={staff.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>


          <input
            type="text"
            className="form-control mb-3"
            name="services"
            placeholder="Services"
            value={staff.services}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            name="experience"
            placeholder="Experience (Years)"
            value={staff.experience}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            name="specialization"
            placeholder="Specialization"
            value={staff.specialization}
            onChange={handleChange}
          />

          <input
            type="number"
            className="form-control mb-3"
            name="salary"
            placeholder="Salary"
            value={staff.salary}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            className="form-control mb-3"
            name="joiningDate"
            value={staff.joiningDate}
            onChange={handleChange}
            required
          />

          <select
            className="form-control mb-3"
            name="status"
            value={staff.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Staff"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;