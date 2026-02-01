import React, { useState } from "react";

function Staffs() {
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "Riya Patel",
      role: "Beautician",
      service: "Natural Facial",
      phone: "9876543210",
      experience: "3 Years",
      status: "Active",
    },
  ]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Staff Management 👩‍💼</h2>

      <table className="table table-bordered">
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Staff Name</th>
            <th>Role</th>
            <th>Assigned Service</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staffList.map((staff, index) => (
            <tr key={staff.id}>
              <td>{index + 1}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.service}</td>
              <td>{staff.phone}</td>
              <td>{staff.experience}</td>
              <td>
                <span
                  className={
                    staff.status === "Active"
                      ? "badge bg-success"
                      : "badge bg-danger"
                  }
                >
                  {staff.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2">
                  Edit
                </button>
                <button className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary mt-3">
        + Add New Staff
      </button>
    </div>
  );
}

export default Staffs;
