import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";

function Adminservice() {

  const navigate = useNavigate();

  // ✅ Services state
  const [services, setServices] = useState([]);

  // ✅ Debug log
  useEffect(() => {
    console.log("SERVICES STATE 👉", services);
  }, [services]);

  // ✅ Delete
  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // ✅ Edit (navigate to edit page with id)
  const handleEdit = (service) => {
    navigate(`/addservice?id=${service.id}`);
  };

  /* ✅ Table Columns */
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

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Services Management 🛠️</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/addservice")}
        >
          + Add Service
        </button>
      </div>

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
