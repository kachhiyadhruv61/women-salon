function Userpayment() {
  const payments = [
    { id: 1, amount: 998, method: "UPI", status: "Paid" },
    { id: 2, amount: 499, method: "Cash", status: "Paid" },
  ];

  return (
    <div>
      <h4>My Payments 💳</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>₹{p.amount}</td>
              <td>{p.method}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Userpayment;