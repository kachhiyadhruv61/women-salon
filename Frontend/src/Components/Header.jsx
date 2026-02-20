import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="container-fluid bg-light sticky-top p-0">
      <nav className="navbar navbar-expand-lg navbar-light p-0">

        <NavLink to="/" className="navbar-brand py-2 px-3">
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
          <div className="navbar-nav mx-auto">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/service"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Service
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Products
            </NavLink>

            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Pages
              </span>
              <div className="dropdown-menu bg-light mt-2">
                <NavLink to="/gallery" className="dropdown-item">
                  Gallery
                </NavLink>
                <NavLink to="/team" className="dropdown-item">
                  Our Team
                </NavLink>
                <NavLink to="/testimonial" className="dropdown-item">
                  Testimonial
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-item nav-link active" : "nav-item nav-link"
              }
            >
              Contact
            </NavLink>

          </div>

          <NavLink to="/login" className="btn btn-sm btn-primary">
            LOGIN
          </NavLink>

        </div>
      </nav>
    </div>
  );
}

export default Navbar;