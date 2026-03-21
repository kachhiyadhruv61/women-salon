import { useEffect, useState } from "react";
import CommonTable from "../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function Orders() {
  const [orders, setOrders] = useState([]);

  /* 🟢 FETCH ORDERS */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // const res = await fetch("http://localhost:5000/orders");
      const res = await apiFetch("/orders", {
              method: "GET",
            });
      const data = await res.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  /* 🟢 UPDATE STATUS */
  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status })
      });

      fetchOrders();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },

    { id: "orderId", header: "Order ID",  Cell: ({ row }) => row.original._id.slice() },

    {
      id: "createdAt",
      header: "Order Date",
      Cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },

    { id: "userName", header: "User", accessorKey: "userName" },

    { id: "contact", header: "Contact", accessorKey: "contact" },

    {
      id: "items",
      header: "Items",
      accessorKey: "items",
     Cell: ({ cell }) => {
  const items = cell.getValue();

  if (!Array.isArray(items)) return "-";

  return items.map((item, index) => (
    <div key={index}>
      {item.name} (x{item.qty})
    </div>
  ));
}
    },

    {
      id: "totalAmount",
      header: "Amount",
      accessorKey: "totalAmount",
      Cell: ({ cell }) => `₹${cell.getValue()}`,
    },

    { id: "paymentMethod", header: "Payment", accessorKey: "paymentMethod" },

    {
      id: "paymentStatus",
      header: "Payment Status",
      accessorKey: "paymentStatus",
    },

    {
      id: "orderStatus",
      header: "Order Status",
      accessorKey: "orderStatus",
    },

    {
      id: "action",
      header: "Update Status",
      Cell: ({ row }) => {
        const status = row.original.orderStatus;

        if (status === "Cancelled") {
          return <span className="text-danger">Cancelled</span>;
        }

        return (
          <select
            className="form-select form-select-sm"
            value={status}
            onChange={(e) =>
              updateOrderStatus(row.original._id, e.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      },
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