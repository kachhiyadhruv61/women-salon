import React, { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({
    name: "Aditi Patel",
    email: "kachhiyadhruv61@gmail.com",
    phone: "9876543210",
    address: "Ahmedabad, Gujarat",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👤 My Profile</h2>

      <div className="card shadow">
        <div className="card-body">
          {/* NAME */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
              disabled={!editMode}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              className="form-control"
              disabled
            />
          </div>

          {/* PHONE */}
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="form-control"
              disabled={!editMode}
            />
          </div>

          {/* ADDRESS */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              className="form-control"
              rows="2"
              disabled={!editMode}
            ></textarea>
          </div>

          {/* BUTTONS */}
          {!editMode ? (
            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
