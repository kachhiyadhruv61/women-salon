import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function AdBooking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // ✅ GET BOOKINGS FROM BACKEND
  const getBookings = async () => {
    try {
      const res = await apiFetch("/bookings", {
              method: "GET",
            });
      const result = await res.json();

      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // ✅ PAGE LOAD API CALL
  useEffect(() => {
    getBookings();
  }, []);

  // ✅ UPDATE STATUS (Frontend only)
 const updateStatus = async (id, status) => {
  try {
    const res = await apiFetch(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (data.success) {
      getBookings(); // 🔄 refresh table
    } else {
      alert("Failed to update status");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

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
              updateStatus(row.original._id, "Approved")
            }
          >
            Approve
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              updateStatus(row.original._id, "Rejected")
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2> Booking Management 👩‍💼</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/bookingform")}
        >
          + Add Booking
        </button>
      </div>

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
