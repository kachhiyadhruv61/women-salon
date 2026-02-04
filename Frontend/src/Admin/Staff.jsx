import React, { useState } from "react";
import CommonTable from "../Components/CommonTable";
import StaffStatusBtn from "../Components/Staff/StaffStatusbtn";
import AssignService from "../Components/Staff/AssignService";

function Staffs() {
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "Riya Patel",
      role: "Beautician",
      services: ["Natural Facial"],
      phone: "9876543210",
      experience: "3 Years",
      status: "Active",
    },
  ]);

  const services = ["Haircut", "Facial", "Cleanup"];

  /* Assign Service */
  const assignService = (id, service) => {
    if (!service) return;

    setStaffList((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, services: [...new Set([...s.services, service])] }
          : s
      )
    );
  };

  /* Toggle Status */
  const toggleStaffStatus = (id) => {
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  /* ✅ Columns for CommonTable */
  const columns = [
    {
      header: "#",
      accessor: (_, index) => index + 1,
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
      header: "Services",
      accessor: (row) => row.services.join(", "),
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Experience",
      accessor: "experience",
    },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`badge ${
            row.status === "Active" ? "bg-success" : "bg-danger"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Assign",
      accessor: (row) => (
        <AssignService
          services={services}
          onAssign={(service) => assignService(row.id, service)}
        />
      ),
    },
    {
      header: "Action",
      accessor: (row) => (
        <StaffStatusBtn
          status={row.status}
          onToggle={() => toggleStaffStatus(row.id)}
        />
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Staff Management 👩‍💼</h2>

      <CommonTable
        columns={columns}
        data={staffList}
        fileName="staff"
        showSelection={true}
      />
    </div>
  );
}

export default Staffs;
