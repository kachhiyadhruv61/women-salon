import { Link, useNavigate } from "react-router-dom";
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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid">

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src="/img/logo.png"
            alt="A2 Women Salon"
            height="45"
          />
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="adminNavbar">
         <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link to="/user" className="nav-link">User</Link>
            </li>

            <li className="nav-item">
              <Link to="/staff" className="nav-link">Staff</Link>
            </li>

            <li className="nav-item">
              <Link to="/adminservice" className="nav-link">Service</Link>
            </li>

            <li className="nav-item">
              <Link to="/adbooking" className="nav-link">Booking</Link>
            </li>

            <li className="nav-item">
              <Link to="/orders" className="nav-link">Orders</Link>
            </li>

            <li className="nav-item">
              <Link to="/product" className="nav-link">Product</Link>
            </li>

            <li className="nav-item">
              <Link to="/adpayment" className="nav-link">Payment</Link>
            </li>

            {/* Pages Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Pages
              </span>
              <ul className="dropdown-menu">
                <li><Link to="/contactdata" className="dropdown-item">Inqueries</Link></li>
                <li><Link to="/reports" className="dropdown-item">Reports</Link></li>
                <li><Link to="/settings" className="dropdown-item">Settings</Link></li>
              </ul>
            </li>
          </ul>

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

             {showNotify && (
                <div
                  className="position-absolute end-0 mt-2 bg-white shadow rounded p-3"
                  style={{ width: "300px", zIndex: 1000 }}
                >
                  <h6 className="fw-bold mb-2">Notifications</h6>

                  {notifications.length === 0 ? (
                    <p className="text-muted small">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`border-bottom py-2 ${!n.isRead ? "fw-semibold" : ""}`}
                      >
                        <div>{n.title}</div>
                        <small className="text-muted">{n.message}</small>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Logout */}
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;