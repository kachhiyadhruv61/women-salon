import { useState } from "react";
import CommonTable from "./../Components/CommonTable";
function Adpayment() {
  const [payments, setPayments] = useState([]);
  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
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
  const addPayment = (e) => {
    e.preventDefault();

    if (!customer || !service || !amount || !method) {
      alert("Please fill all fields");
      return;
    }

    const newPayment = {
      id: Date.now(),
      paymentId: "PAY" + Math.floor(Math.random() * 10000),
      transactionId: "TXN" + Math.floor(Math.random() * 100000),
      customer,
      service,
      amount,
      method,
      status: "Paid",
      date: new Date().toLocaleDateString(),
    };

    setPayments([...payments, newPayment]);
    setCustomer("");
    setService("");
    setAmount("");
    setMethod("");
  };

  const deletePayment = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Payment Management 💳</h2>

      {/* Payment Form */}
      <form onSubmit={addPayment} className="mb-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="form-control mb-2"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Select Service</option>
          <option>Waxing</option>
          <option>Facial</option>
          <option>Manicure</option>
          <option>Pedicure</option>
          <option>Bridal Package</option>
        </select>

        <input
          type="number"
          placeholder="Amount (₹)"
          className="form-control mb-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="">Payment Method</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Net Banking</option>
        </select>

        <button className="btn btn-success w-100">Add Payment</button>
      </form>

     
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
