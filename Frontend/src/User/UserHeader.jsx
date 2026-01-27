import { Link, useNavigate } from "react-router-dom";

function UserHeader({ setRole }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    setRole("guest");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🌿 Organic Salon
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="userNavbar">
          {/* Left menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/userdashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userbooking">
                My Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userorders">
                My Orders
              </Link>
            </li>
          </ul>

          {/* Right menu */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/cart" className="btn btn-outline-success">
              🛒 Cart
            </Link>

            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;