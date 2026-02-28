import React from "react";
import { Link } from "react-router-dom";

function StaffDashboard() {
  // dummy data (pachi backend mathi aavse)
  const summary = {
    today: 3,
    pending: 5,
    completed: 12,
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Staff Dashboard 👩‍💼</h2>

      {/* 🔹 SUMMARY CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Today's Appointments</h5>
              <h2 className="text-primary">{summary.today}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <h2 className="text-warning">{summary.pending}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
              <h2 className="text-success">{summary.completed}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 QUICK ACTIONS */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Quick Actions</h4>

        <div className="d-flex gap-3 flex-wrap">
          <Link to="/staff/appointments" className="btn btn-primary">
            View My Appointments
          </Link>

          <Link to="/staff/profile" className="btn btn-outline-secondary">
            My Profile
          </Link>

          <button className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
