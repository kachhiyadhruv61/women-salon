import { useEffect, useState } from "react";
import CommonTable from "../Components/CommonTable";

function Orders() {
  const [orders, setOrders] = useState([]);

  /* 🟢 FETCH ORDERS */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
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
    <CommonTable
      columns={columns}
      data={orders}
      fileName="admin-orders"
      showSelection={true}
    />
  );
}

export default Orders;
