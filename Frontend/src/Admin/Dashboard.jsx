

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ role }) => {
  const navigate = useNavigate();

  // 🔐 Protect admin route
  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <h2 className="mb-4 fw-bold text-dark">Admin Dashboard</h2>
      

      <div className="row g-4">
        {/* Users */}
        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-people-fill fs-1 text-primary"></i>
              <h5 className="mt-3">Total Users</h5>
              <h3 className="fw-bold">120</h3>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-scissors fs-1 text-success"></i>
              <h5 className="mt-3">Services</h5>
              <h3 className="fw-bold">18</h3>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-calendar-check-fill fs-1 text-warning"></i>
              <h5 className="mt-3">Bookings</h5>
              <h3 className="fw-bold">75</h3>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <i className="bi bi-currency-rupee fs-1 text-danger"></i>
              <h5 className="mt-3">Payments</h5>
              <h3 className="fw-bold">₹45,000</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card shadow border-0 mt-5">
        <div className="card-header bg-dark text-white">
          Recent Activities
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">New user registered</li>
            <li className="list-group-item">New booking created</li>
            <li className="list-group-item">Payment received</li>
            <li className="list-group-item">Service updated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;