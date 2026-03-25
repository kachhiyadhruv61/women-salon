import { useState, useEffect } from "react";
import CommonTable from "../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function Bookingpay() {
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // 🟢 FETCH PAYMENTS
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await apiFetch("/bookingpay", {
        method: "GET",
      });

      const data = await res.json();

      // ✅ ONLY BOOKING PAYMENTS
      const bookingPayments = (data.data || []).filter(
        (p) => p.paymentType === "booking"
      );

      setPayments(bookingPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  // 🗑 DELETE
  const deletePayment = async (id) => {
    try {
      await apiFetch(`/bookingpay/${id}`, {
        method: "DELETE",
      });
      fetchPayments();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // 🔍 STATUS FILTER
  const filteredPayments =
    statusFilter === "All"
      ? payments
      : payments.filter(
          (p) =>
            p.paymentStatus?.toLowerCase() ===
            statusFilter.toLowerCase()
        );

  // 📊 TABLE COLUMNS
  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      header: "Booking ID",
      accessorKey: "bookingId",
    },
    {
      header: "Customer",
      accessorKey: "userName",
    },
    {
      header: "Contact",
      accessorKey: "contact",
    },
    {
      header: "Service",
      accessorFn: (row) =>
        row.serviceName || row.bookingDetails?.service || "-",
    },
    {
      header: "Date",
      accessorFn: (row) =>
        row.bookingDetails?.date || "-",
    },
    {
      header: "Time",
      accessorFn: (row) =>
        row.bookingDetails?.time || "-",
    },
    {
      header: "Amount (₹)",
      accessorFn: (row) => `₹${row.amount}`,
    },
    {
      header: "Method",
      accessorKey: "paymentMethod",
    },
    {
      header: "Status",
      accessorKey: "paymentStatus",
      Cell: ({ cell }) => {
        const status = cell.getValue()?.toLowerCase();

        const color =
          status === "success" || status === "paid"
            ? "bg-success"
            : status === "pending"
            ? "bg-warning"
            : "bg-danger";

        return (
          <span className={`badge ${color}`}>
            {status?.toUpperCase()}
          </span>
        );
      },
    },
    {
      header: "Created",
      accessorFn: (row) =>
        new Date(row.createdAt).toLocaleString(),
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deletePayment(row.original._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>📅 Booking Payments (Admin)</h2>

      {/* 🔥 STATUS FILTER */}
      <div className="mb-3 d-flex gap-2">
        {["All", "Paid", "Pending", "Failed"].map((status) => (
          <button
            key={status}
            className={`btn ${
              statusFilter === status
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 📊 TABLE */}
      <CommonTable
        columns={columns}
        data={filteredPayments}
        fileName="booking-payments"
        showSelection={true}
      />
    </div>
  );
}

export default Bookingpay;