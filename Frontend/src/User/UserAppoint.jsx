import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";

function UserAppoint() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // ✅ GET BOOKINGS FROM BACKEND
  const getBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/bookings");
      const data = await res.json();

      setBookings(data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // ✅ PAGE LOAD TIME API CALL
  useEffect(() => {
    getBookings();
  }, []);

  // ❌ Cancel Booking (frontend state change)
  const cancelBooking = (id) => {
    setBookings(
      bookings.map((b) =>
        b._id === id ? { ...b, status: "Cancelled" } : b
      )
    );
  };

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
            onClick={() => cancelBooking(row.original._id)}
          >
            Cancel
          </button>
        ),
    },
  ];

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">My Appointments 👩‍🦰</h3>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/userbooking")}
        >
          + Book Appointment
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={bookings}
        fileName="userbooking"
        showSelection={false}
      />
    </div>
  );
}

export default UserAppoint;