import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function UserAppoint() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // ✅ GET BOOKINGS FROM BACKEND
  const getBookings = async () => {
    try {
      // const res = await fetch("http://localhost:5000/bookings");
      const res = await apiFetch("/bookings", {
              method: "GET",
            });
      
      const result = await res.json();

      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ PAGE LOAD TIME API CALL
  useEffect(() => {
    getBookings();
  }, []);

  const updateStatus = async (id, status) => {
  try {
    await apiFetch(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    getBookings(); // refresh data
  } catch (error) {
    console.error(error);
  }
};

// 🔁 Reschedule (simple version)
const rescheduleBooking = async (booking) => {
  const newDate = prompt("Enter new date (YYYY-MM-DD):", booking.date);
  const newTime = prompt("Enter new time (HH:MM):", booking.time);

  if (!newDate || !newTime) return;

  try {
    await apiFetch(`/bookings/${booking._id}`, {
      method: "PUT",
      body: JSON.stringify({
        date: newDate,
        time: newTime,
        status: "Pending", // again approval needed
      }),
    });

    getBookings();
  } catch (error) {
    console.error(error);
  }
};

  // ❌ Cancel Booking (frontend state change)
 
  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      id: "bookingId",
      header: "Booking ID",
      accessorKey: "_id",
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
  Cell: ({ row }) => {
    const booking = row.original;

    return (
      <div className="d-flex gap-2 flex-wrap">

        {/* ❌ Cancel */}
        {booking.status !== "Cancelled" &&
          booking.status !== "Completed" && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                updateStatus(booking._id, "Cancelled")
              }
            >
              Cancel
            </button>
          )}

        {/* ✅ Complete */}
        {booking.status === "Approved" && (
          <button
            className="btn btn-success btn-sm"
            onClick={() =>
              updateStatus(booking._id, "Completed")
            }
          >
            Complete
          </button>
        )}

        {/* 🔁 Reschedule */}
        {booking.status !== "Cancelled" &&
          booking.status !== "Completed" && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() =>
                rescheduleBooking(booking)
              }
            >
              Reschedule
            </button>
          )}

      </div>
    );
  },
}
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