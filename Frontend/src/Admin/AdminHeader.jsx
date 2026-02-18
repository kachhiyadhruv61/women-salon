import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminHeader = ({ setRole }) => {
  const navigate = useNavigate();

  const [showNotify, setShowNotify] = useState(false);

    // Dummy Notifications Data (later API thi lai sakay)
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
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/dashboard" className="navbar-brand">
        Admin Panel
      </Link>

      <ul className="navbar-nav flex-row gap-2">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/user" className="nav-link text-white">
            User
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/staff" className="nav-link text-white">
            Staff
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/adminservice" className="nav-link text-white">
            Service
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/adbooking" className="nav-link text-white">
            Booking
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/orders" className="nav-link text-white">
            Orders
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/product" className="nav-link text-white">
            Product
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/adpayment" className="nav-link text-white">
            Payment
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contactdata" className="nav-link text-white">
            Inqueries
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/reports" className="nav-link text-white">
            Reports
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">
            Settings
          </Link>
        </li>
 {/* ================= NOTIFICATION BELL ================= */}
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
                    className={`border-bottom py-2 ${
                      !n.isRead ? "fw-semibold" : ""
                    }`}
                  >
                    <div>{n.title}</div>
                    <small className="text-muted">{n.message}</small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <li className="nav-item">
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHeader;