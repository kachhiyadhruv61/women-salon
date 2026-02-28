import { useState } from "react";
import CommonTable from "./../Components/CommonTable";
function Adpayment() {
  const [payments, setPayments] = useState([]);
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
    Cell: ({ cell }) => (
      <span className="badge bg-success">
        {cell.getValue()}
      </span>
    ),
    accessorKey: "status",
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
