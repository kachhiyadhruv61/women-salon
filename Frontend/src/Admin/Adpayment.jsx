import { useState, useEffect } from "react";
import CommonTable from "./../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function Adpayment() {
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // 🟢 FETCH PAYMENTS
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await apiFetch("/payments", {
        method: "GET",
      });

      const data = await res.json();
      setPayments(data.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  // 🗑 DELETE PAYMENT (API)
  const deletePayment = async (id) => {
    try {
      await apiFetch(`/payments/${id}`, {
        method: "DELETE",
      });

      // refresh list
      fetchPayments();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

   // 🔍 FILTER LOGIC
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
  // {
  //   id: "sr",
  //   header: "#",
  //   accessorFn: (_, index) => index + 1,
  // },
  // {
  //   header: "Order ID",
  //   accessorKey: "orderId",
  // },
  {
    header: "Razorpay Order",
    accessorKey: "razorpayOrderId",
  },
  {
    header: "Payment ID",
    accessorFn: (row) =>
      row.razorpayPaymentId ||
      row.paymentPayload?.razorpay_payment_id ||
      "-",
  },
  // {
  //   header: "Transaction ID",
  //   accessorFn: (row) =>
  //     row.paymentPayload?.transactionId || "-",
  // },
  {
    header: "Customer",
    accessorKey: "userName",
  },
  {
    header: "Contact",
    accessorKey: "contact",
  },
  {
    header: "Items",
    accessorFn: (row) =>
      row.items?.length
        ? row.items.map((i) => i.name).join(", ")
        : "-",
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
    header: "Updated",
    accessorFn: (row) =>
      new Date(row.updatedAt).toLocaleString(),
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2> Payment Management 💳</h2>
      </div>

      {/* 🔥 FILTER BUTTONS */}
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
        data={filteredPayments}   // ✅ only this
        fileName="adpayment"
        showSelection={true}
      />
    </div>
  );
}

export default Adpayment;