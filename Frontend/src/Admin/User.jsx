import React, { useState, useMemo } from "react";
import CommonTable from "../Components/CommonTable";

function User() {
  const [users, setUsers] = useState([
    {
      userId: 1,
      name: "Aditi Patel",
      email: "aditi@gmail.com",
      phone: "9876543210",
      password: "********",
      role: "User",
      status: "Active",
      gender: "Female",
      address: "Ahmedabad, Gujarat",
      pincode: "380001",
      emailOtp: "123456",
      createdAt: "2026-02-01",
      updatedAt: "2026-02-03",
    },
  ]);

  // ❌ DELETE USER
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.userId !== id));
  };

  // 📊 TABLE COLUMNS
  const columns = useMemo(
    () => [
      { accessorKey: "userId", header: "User ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "password", header: "Password" },
      { accessorKey: "role", header: "Role" },
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
      { accessorKey: "emailOtp", header: "Email OTP" },
      { accessorKey: "createdAt", header: "Created At" },
      { accessorKey: "updatedAt", header: "Updated At" },
      {
        accessorKey: "userId",
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
    [users]
  );

  return (
    <div className="container py-5">

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
