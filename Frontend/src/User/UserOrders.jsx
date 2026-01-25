

function UserOrders() {
  const orders = [
    { id: 1, product: "Herbal Hair Oil", qty: 2, total: 998, status: "Delivered" },
    { id: 2, product: "Aloe Vera Gel", qty: 1, total: 199, status: "Pending" },
  ];

  return (
    <div>
      <h4>My Orders 🛒</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.product}</td>
              <td>{o.qty}</td>
              <td>₹{o.total}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrders;