import { useState } from "react";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Aditi Patel",
    email: "aditi@gmail.com",
    phone: "9876543210",
    gender: "Female",
    dob: "2002-06-15",
  });

  const [form, setForm] = useState(profile);

  /* ================= EDIT ================= */
  const handleEdit = () => {
    setForm(profile);
    setIsEditing(true);
  };

  /* ================= SAVE ================= */
  const handleSave = (e) => {
    e.preventDefault();
    setProfile(form);
    setIsEditing(false);
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    setIsEditing(false);
    setForm(profile);
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">My Profile</h3>

      <div className="card p-4">
        {!isEditing ? (
          <>
            {/* VIEW MODE */}
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Name:</strong>
                <p>{profile.name}</p>
              </div>
              <div className="col-md-6">
                <strong>Email:</strong>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Phone:</strong>
                <p>{profile.phone}</p>
              </div>
              <div className="col-md-6">
                <strong>Gender:</strong>
                <p>{profile.gender}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Date of Birth:</strong>
                <p>{profile.dob}</p>
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            {/* EDIT MODE */}
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.dob}
                    onChange={(e) =>
                      setForm({ ...form, dob: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-4 d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
