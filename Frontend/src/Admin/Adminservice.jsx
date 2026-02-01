import { useState } from "react";

function Adminservice() {
  const [services, setServices] = useState([]);
  const [service, setService] = useState({
    name: "",
    duration: "",
    amount: "",
    staff: "",
    fishTankTherapy: false,
    status: "active",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setService({
      ...service,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!service.name || !service.duration || !service.amount) {
      alert("Please fill required fields: Name, Duration, Amount");
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      // Update existing service
      const updatedServices = services.map((s) =>
        s.id === editingId
          ? { ...s, ...service, updatedDate: now }
          : s
      );
      setServices(updatedServices);
      setEditingId(null);
    } else {
      // Add new service
      const newService = {
        ...service,
        id: Date.now(),
        createdDate: now,
        updatedDate: now,
      };
      setServices([...services, newService]);
    }

    // Reset form
    setService({
      name: "",
      duration: "",
      amount: "",
      staff: "",
      fishTankTherapy: false,
      status: "active",
    });
  };

  const handleEdit = (s) => {
    setService(s);
    setEditingId(s.id);
  };

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Services Management 🛠️</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="mb-4 card p-3 shadow">
        <h4>{editingId ? "Edit Service" : "Add Service"}</h4>

        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={service.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 60 mins)"
          value={service.duration}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={service.amount}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="staff"
          placeholder="Staff Assigned (comma separated)"
          value={service.staff}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <div className="form-check mb-2">
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
          className="form-control mb-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit" className="btn btn-primary w-100">
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Services List */}
      <h4>All Services</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Amount (₹)</th>
            <th>Staff</th>
            <th>Fish Tank Therapy</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">
                No services added
              </td>
            </tr>
          ) : (
            services.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.duration}</td>
                <td>₹{s.amount}</td>
                <td>{s.staff}</td>
                <td>{s.fishTankTherapy ? "✅ Yes" : "❌ No"}</td>
                <td>{s.status}</td>
                <td>{s.createdDate}</td>
                <td>{s.updatedDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Adminservice;
