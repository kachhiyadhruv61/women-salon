import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="container-fluid bg-light sticky-top p-0">
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <Link to="/" className="navbar-brand bg-primary py-4 px-5 me-0">
          <h1 className="mb-0">
            <i className="bi bi-flower1"></i> A <sup>2</sup>
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
          <div className="navbar-nav mx-auto">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link to="/service" className="nav-item nav-link">Service</Link>
            <Link to="/products" className="nav-item nav-link">Products</Link>
            
            

            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Pages
              </span>
              <div className="dropdown-menu bg-light mt-2">
                <Link to="/team" className="dropdown-item">Our Team</Link>
                <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
              </div>
            </div>
              <Link to="/contact" className="nav-item nav-link">Contact</Link>


            
          </div>

        
          {/* ✅ REGISTER BUTTON */}
          <Link to="/login" className="btn btn-sm btn-primary">
            LOGIN
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
