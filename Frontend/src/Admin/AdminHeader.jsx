import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminHeader = ({ setRole }) => {
  const navigate = useNavigate();
  const [showNotify, setShowNotify] = useState(false);

  const [notifications] = useState([
    {
      id: 1,
      title: "New Booking",
      message: "New booking received from Priya.",
      isRead: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "₹2000 payment completed.",
      isRead: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const logout = () => {
    localStorage.removeItem("role");
    setRole("guest");
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-light sticky-top p-0">
      <nav className="navbar navbar-expand-lg navbar-light p-0">

        {/* Logo → Dashboard */}
        <NavLink to="/dashboard" className="navbar-brand py-2 px-3">
          <img
            src="/img/logo.png"
            alt="A2 Women Salon"
            className="logo-img"
          />
        </NavLink>

        {/* Toggle */}
        <button
          className="navbar-toggler me-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse p-3" id="adminNavbar">

          <div className="navbar-nav mx-auto">

            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              User
            </NavLink>

            <NavLink
              to="/staff"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Staff
            </NavLink>

            {/* Dropdown */}
            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Service
              </span>
              <div className="dropdown-menu bg-light mt-2">
                 <NavLink to="adminservice" className="dropdown-item">
                  All Service 
                </NavLink>
                <NavLink to="/addservicecategory" className="dropdown-item">
                  Service Category
                </NavLink>
                <NavLink to="/addservice" className="dropdown-item">
                  Sub Services
                </NavLink>
                <NavLink to="/addvariant" className="dropdown-item">
                  Service Varients
                </NavLink>
                <NavLink to="/servicepackageform" className="dropdown-item">
                  Service Packages
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Product
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="/adbooking"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Booking
            </NavLink>

            <NavLink
              to="/adpayment"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Payment
            </NavLink>

            {/* Dropdown */}
            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Pages
              </span>
              <div className="dropdown-menu bg-light mt-2">
                 <NavLink to="/coupons" className="dropdown-item">
                  Coupons
                </NavLink>
                <NavLink to="/contactdata" className="dropdown-item">
                  Inqueries
                </NavLink>
                <NavLink to="/reports" className="dropdown-item">
                  Reports
                </NavLink>
                <NavLink to="/settings" className="dropdown-item">
                  Settings
                </NavLink>
              </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">

            {/* Notification */}
            <div className="position-relative">
              <button
                className="btn btn-light rounded-circle"
                onClick={() => setShowNotify(!showNotify)}
              >
                🔔
              </button>

              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadCount}
                </span>
              )}
            </div>

            {/* Logout */}
            <button className="btn btn-sm btn-primary" onClick={logout}>
              LOGOUT
            </button>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;