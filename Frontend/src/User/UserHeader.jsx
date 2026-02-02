import { Link, useNavigate } from "react-router-dom";

function UserHeader({ setRole }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    setRole("guest");
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-light sticky-top p-0">
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <Link to="/" className="navbar-brand bg-primary py-4 px-5 me-0">
          <h1 className="mb-0">
            <i className="bi bi-scissors"></i> A <sup>2</sup>
          </h1>
        </Link>

        <button
          className="navbar-toggler me-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse p-3" id="navbarCollapse">
          {/* NAV MENUS */}
          <div className="navbar-nav mx-auto">
            <Link to="/userdashboard" className="nav-item nav-link">Dashboard</Link>
            <Link to="/book-appointment" className="nav-item nav-link">Book Appointment</Link>
            <Link to="/services" className="nav-item nav-link">Services</Link>
            <Link to="/shop" className="nav-item nav-link">Shop</Link>

            <Link to="/my-appointments" className="nav-item nav-link">My Appointments</Link>
            <Link to="/userorders" className="nav-item nav-link">My Orders</Link>
            <Link to="/cart" className="nav-item nav-link">🛒 Cart</Link>
          </div>

          {/* USER DROPDOWN */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle me-1"></i> Account
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link to="/profile" className="dropdown-item">My Profile</Link>
              </li>
              <li>
                <Link to="/addresses" className="dropdown-item">My Addresses</Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button onClick={logout} className="dropdown-item text-danger">
                  Logout
                </button>
              </li>
            </ul>

          </div>

        </div>
      </nav>
    </div>
  );
}

export default UserHeader;
