import React, { useState, useMemo } from "react";
import CommonTable from "./../Components/CommonTable";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");

  // ➕ Add Order
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

  // ❌ Delete Order
  const deleteOrder = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  // 📊 Columns for CommonTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "customer",
        header: "Customer",
      },
      {
        accessorKey: "product",
        header: "Product",
      },
      {
        accessorKey: "quantity",
        header: "Qty",
      },
      {
        accessorKey: "price",
        header: "Price (₹)",
        Cell: ({ cell }) => `₹${cell.getValue()}`,
      },
      {
        accessorKey: "total",
        header: "Total (₹)",
        Cell: ({ cell }) => `₹${cell.getValue()}`,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return (
            <span
              className={`badge ${
                value === "Completed"
                  ? "bg-success"
                  : value === "Cancelled"
                  ? "bg-danger"
                  : "bg-warning text-dark"
              }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "id",
        header: "Action",
        Cell: ({ cell }) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteOrder(cell.getValue())}
          >
            Delete
          </button>
        ),
      },
    ],
    [orders]
  );

  return (
    <div className="container mt-4">
      <h2>Admin Orders Management 🛒</h2>

      {/* 📝 Order Form */}
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
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button className="btn btn-primary w-100">Add Order</button>
      </form>

      {/* 📊 Orders Table (Mantine + Export) */}
      <CommonTable
        columns={columns}
        data={orders}
        fileName="orders"
        showSelection={true}
      />
    </div>
  );
}

export default Orders;
