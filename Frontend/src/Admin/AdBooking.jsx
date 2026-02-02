import { useState } from "react";
import CommonTable from "../Components/CommonTable";

function AdBooking() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Aditi",
      service: "Facial",
      date: "2026-01-20",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      )
    );
  };

  // ✅ Columns for CommonTable (MRT compatible)
  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      id: "name",
      header: "Customer Name",
      accessorKey: "name",
    },
    {
      id: "service",
      header: "Service",
      accessorKey: "service",
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return (
          <span
            className={`badge ${
              value === "Approved"
                ? "bg-success"
                : value === "Rejected"
                ? "bg-danger"
                : "bg-warning"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      Cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-success btn-sm"
            onClick={() =>
              updateStatus(row.original.id, "Approved")
            }
          >
            Approve
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              updateStatus(row.original.id, "Rejected")
            }
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container py-5">
      <h3 className="mb-4">Admin Booking Management 👩‍💼</h3>

      {/* ✅ Common Table */}
      <CommonTable
        columns={columns}
        data={bookings}
        fileName="admin-bookings"
        showSelection={true}
      />
    </div>
  );
}

export default AdBooking;
