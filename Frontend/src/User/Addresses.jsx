import { useState, useEffect } from "react";
import "./Addresses.css";

function Addresses() {

  const initialForm = {
    name: "",
    mobile: "",
    address: "",
    pincode: "",
    location: "Home",
  };

  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  /* ================= BACKEND API FETCH ================= */
  useEffect(() => {
  fetchAddresses();
}, []);

const fetchAddresses = async () => {
  try {
    const res = await fetch("http://localhost:5000/addresses", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    const result = await res.json();

    if (result.success) {
      setAddresses(result.data); // ✅ IMPORTANT
    }

  } catch (err) {
    console.error(err);
  }
};

  /* ================= ADD / UPDATE ================= */
  const addOrUpdateAddress = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      name: form.name,
      mobile: form.mobile,
      address: form.address,
      location: form.location,
      pincode: form.pincode || "388001"
    };
    if (editingAddress) {
      await fetch(`http://localhost:5000/addresses/${editingAddress._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
       body: JSON.stringify(payload)
      });
    } else {
      await fetch("http://localhost:5000/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(payload)
      });
    }

    fetchAddresses(); // 🔥 reload
    resetForm();

  } catch (err) {
    console.error(err);
  }
};

  /* ================= DELETE ================= */
 const deleteAddress = async (_id) => {
  await fetch(`http://localhost:5000/addresses/${_id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }
  });

  fetchAddresses();
};

  /* ================= SET DEFAULT ================= */
  const setDefaultAddress = (_id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === _id,
      }))
    );
  };

  /* ================= EDIT ================= */
  const editAddress = (address) => {
  setEditingAddress(address);
  setForm({
    name: address.name,
    mobile: address.mobile,
    address: address.address,
    pincode: address.pincode,
    location: address.location
  });
  setShowForm(true);
};

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm(initialForm);
    setEditingAddress(null);
    setShowForm(false);
  };

  return (
    <div className="container py-4 addresses-page">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 addresses-header">
        <h3 className="addresses-title">My Addresses</h3>
        <button
          className="btn btn-primary addresses-add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Address
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form className="card p-3 mb-4 addresses-form-card" onSubmit={addOrUpdateAddress}>
          <div className="row g-2">

            <div className="col-md-6">
              <input
                className="form-control addresses-input"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="col-md-6">
              <input
  className="form-control addresses-input"
  placeholder="Mobile Number"
  value={form.mobile}
  onChange={(e) =>
    setForm({ ...form, mobile: e.target.value })
  }
  required
/>
            </div>

            <div className="col-12">
              <textarea
  className="form-control addresses-input addresses-textarea"
  placeholder="Full Address"
  value={form.address}
  onChange={(e) =>
    setForm({
      ...form,
      address: e.target.value,
    })
  }
  required
/>
            </div>

            <div className="col-md-4">
              <select
  className="form-select addresses-input"
  value={form.location}
  onChange={(e) =>
    setForm({ ...form, location: e.target.value })
  }
>
                <option>Home</option>
                <option>Office</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex gap-2 addresses-form-actions">
            <button className="btn btn-success" type="submit">
              {editingAddress ? "Update Address" : "Save Address"}
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ADDRESS LIST */}
      <div className="row">

        {addresses.length === 0 && (
          <p className="text-muted addresses-empty">
            No addresses added yet.
          </p>
        )}

        {addresses.map((address) => (
          <div className="col-md-6 mb-3" key={address._id}>
            <div
              className={`card p-3 addresses-item-card ${
                address.isDefault ? "border-success" : ""
              }`}
            >
              <h6>
                {address.name}
                {address.isDefault && (
                  <span className="badge bg-success ms-2">
                    Default
                  </span>
                )}
              </h6>

              <p>{address.mobile}</p>
<p>{address.address}</p>
<p className="text-muted">{address.location}</p>

              <div className="d-flex gap-2 addresses-item-actions">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => editAddress(address)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    deleteAddress(address._id)
                  }
                >
                  Delete
                </button>

                {!address.isDefault && (
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() =>
                      setDefaultAddress(address._id)
                    }
                  >
                    Set Default
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Addresses;
