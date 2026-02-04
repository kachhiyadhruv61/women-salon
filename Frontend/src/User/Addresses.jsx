import { useState, useEffect } from "react";

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const initialForm = {
    name: "",
    phone: "",
    fullAddress: "",
    type: "Home",
  };

  const [form, setForm] = useState(initialForm);

  /* ================= ADD / UPDATE ================= */
  const addOrUpdateAddress = (e) => {
    e.preventDefault();

    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...form, id: addr.id, isDefault: addr.isDefault }
            : addr
        )
      );
    } else {
      setAddresses([
        ...addresses,
        {
          ...form,
          id: Date.now(),
          isDefault: addresses.length === 0,
        },
      ]);
    }

    resetForm();
  };

  /* ================= DELETE ================= */
  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  /* ================= SET DEFAULT ================= */
  const setDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  /* ================= EDIT ================= */
  const editAddress = (address) => {
    setEditingAddress(address);
    setForm(address);
    setShowForm(true);
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm(initialForm);
    setEditingAddress(null);
    setShowForm(false);
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Addresses</h3>
        <button
          className="btn btn-success"
          onClick={() => setShowForm(true)}
        >
          + Add Address
        </button>
      </div>

      {/* ADDRESS FORM */}
      {showForm && (
        <form className="card p-3 mb-4" onSubmit={addOrUpdateAddress}>
          <div className="row g-2">
            <div className="col-md-6">
              <input
                className="form-control"
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
                className="form-control"
                placeholder="Mobile Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Full Address"
                value={form.fullAddress}
                onChange={(e) =>
                  setForm({ ...form, fullAddress: e.target.value })
                }
                required
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option>Home</option>
                <option>Office</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
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
          <p className="text-muted">No addresses added yet.</p>
        )}

        {addresses.map((address) => (
          <div className="col-md-6 mb-3" key={address.id}>
            <div
              className={`card p-3 ${
                address.isDefault ? "border-success" : ""
              }`}
            >
              <h6>
                {address.name}
                {address.isDefault && (
                  <span className="badge bg-success ms-2">Default</span>
                )}
              </h6>

              <p className="mb-1">{address.phone}</p>
              <p className="mb-1">{address.fullAddress}</p>
              <p className="text-muted">{address.type}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => editAddress(address)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteAddress(address.id)}
                >
                  Delete
                </button>

                {!address.isDefault && (
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => setDefaultAddress(address.id)}
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
