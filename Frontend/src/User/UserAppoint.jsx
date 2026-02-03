import { useState } from "react";
import CommonTable from "../Components/CommonTable";

function UserAppoint() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingId: "SALON-001",
      name: "Aditi",
      service: "Facial",
      date: "2026-01-20",
      status: "Approved",
    },
    {
      id: 2,
      bookingId: "SALON-002",
      name: "Aditi",
      service: "Haircut",
      date: "2026-01-22",
      status: "Pending",
    },
  ]);

  const cancelBooking = (id) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "Cancelled" } : b
      )
    );
  };

  // ✅ USER SIDE columns
  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      id: "bookingId",
      header: "Booking ID",
      accessorKey: "bookingId",
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
                : value === "Cancelled"
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
      Cell: ({ row }) =>
        row.original.status === "Pending" && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => cancelBooking(row.original.id)}
          >
            Cancel
          </button>
        ),
    },
  ];

  return (
    <div className="container py-5">
      <h3 className="mb-4">My Appointments 👩‍🦰</h3>

      <CommonTable
        columns={columns}
        data={bookings}
        fileName="userbooking"
        showSelection={false}   // 👈 user side ma usually selection bandh
      />
    </div>
  );
}

export default UserAppoint;
