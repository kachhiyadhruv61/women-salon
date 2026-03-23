import { useState,useEffect } from "react";
import CommonTable from "./../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";
function Adpayment() {
  const [payments, setPayments] = useState([]);
    

  // 🔥 Fetch payments from backend
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await apiFetch("/payments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // अगर auth use करते हो तो token add करो
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        // 👇 map backend data to table format
        const formattedData = data.data.map((item) => ({
          id: item._id,
          paymentId: item.razorpayOrderId || "-",
          transactionId: item.razorpayPaymentId || "-",
          customer: item.userName || "N/A",
          service: item.items?.map((i) => i.name).join(", ") || "Service",
          amount: item.amount,
          method: item.paymentMethod || "Razorpay",
          status: item.paymentStatus,
          date: new Date(item.createdAt).toLocaleDateString(),
        }));

        setPayments(formattedData);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
//DELETE PAYMENT
    const deletePayment = async (id) => {
  try {
    await fetch(`http://localhost:5000/payments/${id}`, {
      method: "DELETE",
    });

    // Refresh data
    fetchPayments();
  } catch (err) {
    console.error("Delete failed:", err);
  }
};
  };
 const columns = [
  {
    id: "sr",
    header: "#",
    accessorFn: (_, index) => index + 1,
  },
  {
    id: "paymentId",
    header: "Payment ID",
    accessorKey: "paymentId",
  },
  {
    id: "transactionId",
    header: "Transaction ID",
    accessorKey: "transactionId",
  },
  {
    id: "customer",
    header: "Customer",
    accessorKey: "customer",
  },
  {
    id: "service",
    header: "Service",
    accessorKey: "service",
  },
  {
    id: "amount",
    header: "Amount (₹)",
    accessorFn: (row) => `₹${row.amount}`,
  },
  {
    id: "method",
    header: "Method",
    accessorKey: "method",
  },
  {
  id: "status",
  header: "Status",
  accessorKey: "status",
  Cell: ({ cell }) => {
    const status = cell.getValue();

    const color =
      status === "success"
        ? "bg-success"
        : status === "pending"
        ? "bg-warning"
        : "bg-danger";

    return <span className={`badge ${color}`}>{status}</span>;
  },
},
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
  },
  {
    id: "action",
    header: "Action",
    Cell: ({ row }) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => deletePayment(row.original.id)}
      >
        Delete
      </button>
    ),
  },
];


  // Add Payment
  const deletePayment = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Admin Payment Management 💳</h2>
       </div>
      <CommonTable
  columns={columns}
  data={payments}   
  fileName="adpayment"
  showSelection={true}
/>

    </div>
  );
}

export default Adpayment;
