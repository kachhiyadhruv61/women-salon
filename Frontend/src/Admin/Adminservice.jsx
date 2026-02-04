import { useState, useEffect } from "react";
import CommonTable from "../Components/CommonTable";



function Adminservice() {
  const [services, setServices] = useState([]);
  useEffect(() => {
  console.log("SERVICES STATE 👉", services);
}, [services]);
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

    const now = new Date().toLocaleString();

    if (editingId) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...service, updatedDate: now } : s
        )
      );
      setEditingId(null);
    } else {
      setServices((prev) => [
        ...prev,
        {
          ...service,
          id: Date.now(),
          createdDate: now,
          updatedDate: now,
        },
      ]);
    }

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
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  /* ✅ CommonTable Columns */
  const columns = [
  {
    header: "#",
    Cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Duration",
    accessorKey: "duration",
  },
  {
    header: "Amount (₹)",
    accessorKey: "amount",
    Cell: ({ cell }) => `₹${cell.getValue()}`,
  },
  {
    header: "Staff",
    accessorKey: "staff",
  },
  {
    header: "Fish Tank Therapy",
    accessorKey: "fishTankTherapy",
    Cell: ({ cell }) => (cell.getValue() ? "✅ Yes" : "❌ No"),
  },
  {
    header: "Status",
    accessorKey: "status",
    Cell: ({ cell }) => (
      <span
        className={`badge ${
          cell.getValue() === "active" ? "bg-success" : "bg-danger"
        }`}
      >
        {cell.getValue()}
      </span>
    ),
  },
  {
    header: "Created Date",
    accessorKey: "createdDate",
  },
  {
    header: "Updated Date",
    accessorKey: "updatedDate",
  },
  {
    header: "Actions",
    Cell: ({ row }) => (
      <>
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => handleEdit(row.original)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </button>
      </>
    ),
  },
];


  return (
    <div className="container mt-4">
      <h2>Admin Services Management 🛠️</h2>

      {/* Form */}
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

      {/* ✅ Common Table */}
      <CommonTable
        columns={columns}
        data={services}
        fileName="services"
        showSelection={true}
      />
    </div>
  );
}

export default Adminservice;
