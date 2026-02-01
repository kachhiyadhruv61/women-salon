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
    name: "#",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Payment ID",
    selector: (row) => row.paymentId,
    sortable: true,
  },
  {
    name: "Transaction ID",
    selector: (row) => row.transactionId,
  },
  {
    name: "Customer",
    selector: (row) => row.customer,
    sortable: true,
  },
  {
    name: "Service",
    selector: (row) => row.service,
  },
  {
    name: "Amount (₹)",
    selector: (row) => `₹${row.amount}`,
    sortable: true,
  },
  {
    name: "Method",
    selector: (row) => row.method,
  },
  {
    name: "Status",
    cell: (row) => (
      <span className="badge bg-success">{row.status}</span>
    ),
  },
  {
    name: "Date",
    selector: (row) => row.date,
  },
  {
    name: "Action",
    cell: (row) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => deletePayment(row.id)}
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

      {/* Payment Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Payment ID</th>
            <th>Transaction ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">
                No payments found
              </td>
            </tr>
          ) : (
            payments.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.paymentId}</td>
                <td>{p.transactionId}</td>
                <td>{p.customer}</td>
                <td>{p.service}</td>
                <td>₹{p.amount}</td>
                <td>{p.method}</td>
                <td>
                  <span className="badge bg-success">{p.status}</span>
                </td>
                <td>{p.date}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1">View</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePayment(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>{/* 📊 Adpayment Table*/}
      <CommonTable
        columns={columns}
        data={Adpayment}
        fileName="adpayment"
        showSelection={true}
      />

    </div>
  );
}

export default Adpayment;
