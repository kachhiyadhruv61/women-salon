import { useEffect, useState } from "react";
import CommonTable from "../Components/CommonTable";

function Orders() {
  const [orders, setOrders] = useState([]);

  /* 🟢 FETCH ORDERS */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();
    setOrders(data.data);
  };

  /* 🟢 UPDATE STATUS */
  const updateOrderStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const columns = [
    { id: "orderId", header: "Order ID", accessorKey: "orderId" },
    { id: "userName", header: "User", accessorKey: "userName" },
    { id: "contact", header: "Contact", accessorKey: "contact" },
    {
      id: "items",
      header: "Items",
      accessorKey: "items",
      Cell: ({ cell }) => {
        const items = cell.getValue();

        if (!items) return "-";

        return items.map((item, index) => (
          <div key={index}>
            {item.name} (x{item.qty})
          </div>
        ));
      },
    },
    {
      id: "totalAmount",
      header: "Amount",
      accessorKey: "totalAmount",
      Cell: ({ cell }) => `₹${cell.getValue()}`,
    },
    { id: "paymentMethod", header: "Payment", accessorKey: "paymentMethod" },
    { id: "paymentStatus", header: "Payment Status", accessorKey: "paymentStatus" },
    {
      id: "orderStatus",
      header: "Order Status",
      accessorKey: "orderStatus",
    },
    {
      id: "action",
      header: "Action",
      Cell: ({ row }) => (
        <select
          className="form-select form-select-sm"
          value={row.original.orderStatus}
          onChange={(e) =>
            updateOrderStatus(row.original._id, e.target.value)
          }
        >
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      ),
    },
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Orders Management 👩‍💼</h2>
        </div>
    <CommonTable
      columns={columns}
      data={orders}
      fileName="admin-orders"
      showSelection={true}
    />
    </div>
  );
}

export default Orders;
