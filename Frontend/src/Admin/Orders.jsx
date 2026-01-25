import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");

  // Add Order
  const addOrder = (e) => {
    e.preventDefault();

    if (!customer || !product || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    const total = quantity * price;

    const newOrder = {
      id: Date.now(),
      customer,
      product,
      quantity,
      price,
      total,
      status,
      date: new Date().toLocaleDateString(),
    };

    setOrders([...orders, newOrder]);

    setCustomer("");
    setProduct("");
    setQuantity("");
    setPrice("");
    setStatus("Pending");
  };

  // Delete Order
  const deleteOrder = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Orders Management 🛒</h2>

      {/* Order Form */}
      <form onSubmit={addOrder} className="mb-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="form-control mb-2"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          type="text"
          placeholder="Product Name"
          className="form-control mb-2"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="form-control mb-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option></option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button className="btn btn-primary w-100">Add Order</button>
      </form>

      {/* Orders Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.quantity}</td>
                <td>₹{o.price}</td>
                <td>₹{o.total}</td>
                <td>
                  <span
                    className={`badge ${
                      o.status === "Completed"
                        ? "bg-success"
                        : o.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{o.date}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteOrder(o.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
