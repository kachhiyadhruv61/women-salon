import React, { useState, useMemo, useEffect } from "react";
import CommonTable from "../Components/CommonTable";

function User() {
  const [users, setUsers] = useState([]);

  // ==============================
  // 📌 FETCH USERS FROM BACKEND
  // ==============================
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==============================
  // ❌ DELETE USER (BACKEND)
  // ==============================
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      // Refresh after delete
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ==============================
  // 📊 TABLE COLUMNS
  // ==============================
  const columns = useMemo(
    () => [
      { accessorKey: "_id", header: "User ID",Cell: ({ row }) => row.original._id.slice(-6) },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "username", header: "Usename" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "password", header: "Password" },

      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <span
            className={`badge ${
              cell.getValue() === "Active"
                ? "bg-success"
                : "bg-secondary"
            }`}
          >
            {cell.getValue()}
          </span>
        ),
      },

      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "pincode", header: "Pincode" },
      { accessorKey: "createdAt", header: "Created At" },
      { accessorKey: "updatedAt", header: "Updated At" },

      {
        accessorKey: "_id",
        header: "Action",
        Cell: ({ cell }) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteUser(cell.getValue())}
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin User Management 👥</h2>
      </div>

      <CommonTable
        columns={columns}
        data={users}
        fileName="users"
        showSelection={true}
      />
    </div>
  );
}

export default User;