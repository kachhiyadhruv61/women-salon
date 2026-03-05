import { NavLink, useNavigate } from "react-router-dom";

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

        {/* Logo → Dashboard Open */}
        <NavLink to="/userdashboard" className="navbar-brand py-2 px-3">
          <img
            src="/img/logo.png"
            alt="A2 Women Salon"
            className="logo-img"
          />
        </NavLink>

        <button
          className="navbar-toggler me-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse p-3" id="navbarCollapse">

          {/* NAV MENUS (Dashboard Removed) */}
          <div className="navbar-nav mx-auto">

            <NavLink
              to="/userservice"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/usershop"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/userappoint"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              My Appointments
            </NavLink>

            <NavLink
              to="/userorders"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              My Orders
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link active position-relative"
                  : "nav-item nav-link position-relative"
              }
            >
              🛒 Cart
            </NavLink>

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
                <NavLink to="/userprofile" className="dropdown-item">
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/addresses" className="dropdown-item">
                  My Addresses
                </NavLink>
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