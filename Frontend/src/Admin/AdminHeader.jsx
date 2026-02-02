import { Link, useNavigate } from "react-router-dom";

const AdminHeader = ({ setRole }) => {
  const navigate = useNavigate();

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
          <Link to="/reports" className="nav-link text-white">
            Reports
          </Link>
        </li>
         <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">
            Settings
          </Link>
        </li>
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