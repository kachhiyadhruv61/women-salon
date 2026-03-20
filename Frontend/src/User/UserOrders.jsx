import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function UserOrders() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // ✅ GET ORDERS FROM BACKEND
  const getOrders = async () => {
    try {
      // const res = await fetch("http://localhost:5000/orders");
       const res = await apiFetch("/orders", {
                method: "GET",
              });
        
      const result = await res.json();

      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ CANCEL ORDER
  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/cancel/${orderId}`, {
        method: "PUT",
      });

      const result = await res.json();

      if (result.success) {
        alert("Order cancelled successfully");
        getOrders(); // refresh orders
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Cancel error:", error);
    }
  };

  // ✅ PAGE LOAD API CALL
  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      id: "orderId",
      header: "Order ID",
       Cell: ({ row }) => row.original._id.slice(),
    },
    {
      id: "createdAt",
      header: "Order Date",
      Cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
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
      header: "Total Amount",
      Cell: ({ row }) => `₹${row.original.totalAmount}`,
    },
    {
      id: "orderStatus",
      header: "Order Status",
      accessorKey: "orderStatus",
    },
    {
      id: "paymentStatus",
      header: "Payment Status",
      accessorKey: "paymentStatus",
    },
    {
      id: "paymentMethod",
      header: "Payment Method",
      accessorKey: "paymentMethod",
    },

    // ✅ CANCEL ORDER COLUMN
    {
      id: "cancel",
      header: "Cancel Order",
      Cell: ({ row }) => {
        const status = row.original.orderStatus;

        if (
          status === "Shipped" ||
          status === "Delivered" ||
          status === "Cancelled"
        ) {
          return "-";
        }

        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => cancelOrder(row.original.orderId)}
          >
            Cancel
          </button>
        );
      },
    },

    {
      id: "action",
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            navigate(`/user/orders/${row.original.orderId}`)
          }
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">My Orders 👩‍🦰</h3>
      </div>

      <CommonTable
        columns={columns}
        data={orders}
        fileName="userOrders"
        showSelection={false}
      />

    </div>
  );
}

export default UserOrders;