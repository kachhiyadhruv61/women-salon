import { useEffect, useState } from "react";
import CommonTable from "../Components/CommonTable";
import { Link } from "react-router-dom";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.data));
  }, []);

  const columns = [
    {
      id: "orderId",
      header: "Order ID",
      accessorKey: "orderId",
    },
    {
      id: "createdAt",
      header: "Order Date",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
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
      header: "Total Amount",
      accessorKey: "totalAmount",
      cell: ({ row }) => `₹${row.original.totalAmount}`,
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
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <Link
          to={`/user/orders/${row.original.orderId}`}
          className="btn btn-sm btn-primary"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="container py-5">
       {/* Header + Button Row */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="mb-0">My Orders 👩‍🦰</h3>

    </div>
      <CommonTable columns={columns} data={orders} />
    </div>
  );
}

export default UserOrders;
