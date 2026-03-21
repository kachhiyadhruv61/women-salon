import React, { useState, useEffect } from "react";
import CommonTable from "../Components/CommonTable";
import { useNavigate } from "react-router-dom";
import StaffStatusBtn from "../Components/Staff/StaffStatusbtn";
import AssignService from "../Components/Staff/AssignService";
import { apiFetch } from "../utils/apiFetch";

function Staffs() {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const services = ["Haircut", "Facial", "Cleanup"];

  /* ================= FETCH STAFF ================= */
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await apiFetch("/staff", {
        method: "GET",
        
      });

      const data = await res.json();
      setStaffList(data.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  /* ================= ASSIGN SERVICE ================= */
  const assignService = async (id, service) => {
    if (!service) return;

    const staff = staffList.find((s) => s._id === id);

    const updatedServices = [
      ...new Set([...(staff.services || []), service]),
    ];

    try {
      await apiFetch(`/staff/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    ...staff,
    services: updatedServices,
  }),
});

      fetchStaff();
    } catch (error) {
      console.error("Error assigning service:", error);
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStaffStatus = async (id) => {
    const staff = staffList.find((s) => s._id === id);

    const updatedStatus =
      staff.status === "Active" ? "Inactive" : "Active";

    try {
      await apiFetch(`/staff/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    ...staff,
    status: updatedStatus,
  }),
});
      fetchStaff();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
  header: "Services",
  accessorFn: (row) =>
    Array.isArray(row.services)
      ? row.services.join(", ")
      : row.services || "",
},
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Experience",
      accessorKey: "experience",
    },
    {
      header: "Status",
      accessorFn: (row) => (
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
      accessorFn: (row) => (
        <AssignService
          services={services}
          onAssign={(service) => assignService(row._id, service)}
        />
      ),
    },
    {
      header: "Action",
      accessorFn: (row) => (
        <StaffStatusBtn
          status={row.status}
          onToggle={() => toggleStaffStatus(row._id)}
        />
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Staff Management 👩‍💼</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/addstaff")}
        >
          + Add Staff
        </button>
      </div>

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