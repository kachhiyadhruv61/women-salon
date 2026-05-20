import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

function UserHeader({ setRole }) {
  const navigate = useNavigate();
  const { cart } = useCart(); // cart array

  const logout = () => {
    localStorage.removeItem("role");
    setRole("guest");
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-light sticky-top p-0 user-header">
      <nav className="navbar navbar-expand-lg navbar-light p-0 user-navbar">

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

        <div className="collapse navbar-collapse user-navbar-collapse" id="navbarCollapse">

          {/* NAV MENUS (Dashboard Removed) */}
          <div className="navbar-nav mx-auto user-nav-menu">

            <NavLink
              to="/userservice"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link user-nav-link active"
                  : "nav-item nav-link user-nav-link"
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/usershop"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link user-nav-link active"
                  : "nav-item nav-link user-nav-link"
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/userappoint"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link user-nav-link active"
                  : "nav-item nav-link user-nav-link"
              }
            >
              My Appointments
            </NavLink>

            <NavLink
              to="/userorders"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link user-nav-link active"
                  : "nav-item nav-link user-nav-link"
              }
            >
              My Orders
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "nav-item nav-link user-nav-link user-cart-link active position-relative"
                  : "nav-item nav-link user-nav-link user-cart-link position-relative"
              }
            >
              <i className="bi bi-cart3 me-1" aria-hidden="true"></i>
              Cart
               {cart.length > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger user-cart-badge"
        >
          {cart.length}
        </span>
      )}
            </NavLink>

          </div>

          {/* USER DROPDOWN */}
          <div className="dropdown user-account-dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle user-account-btn"
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