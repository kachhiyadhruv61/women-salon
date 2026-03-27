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
          "Content-Type": "application/json",
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

  /* ================= DELETE ================= */
  const deleteStaff = async (id) => {
    if (!window.confirm("Are you sure to delete this staff?")) return;

    try {
      const res = await apiFetch(`/staff/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Staff deleted ✅");
        fetchStaff();
      } else {
        alert("Delete failed ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
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
          "Content-Type": "application/json",
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

  /* ================= NAME FORMAT ================= */
  const formatName = (name) => {
    if (!name) return "-";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  /* ================= SERVICES FORMAT ================= */
  const formatServices = (services) => {
    if (!services) return "-";

    if (Array.isArray(services)) {
      return services.length > 0 ? services.join(", ") : "-";
    }

    if (typeof services === "string") {
      return services;
    }

    return "-";
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "#",
      accessorFn: (_, index) => index + 1,
    },

    {
      header: "Name",
      accessorFn: (row) => formatName(row.name),
    },

    // 🔥 ROLE NI JAGYAE SERVICES
    {
      header: "Services",
      accessorFn: (row) => formatServices(row.services),
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
      header: "Salary",
      accessorFn: (row) => (
        <span className="fw-bold text-primary">₹{row.salary}</span>
      ),
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
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/edit-staff/${row._id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteStaff(row._id)}
          >
            Delete
          </button>

          <StaffStatusBtn
            status={row.status}
            onToggle={() => toggleStaffStatus(row._id)}
          />
        </div>
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