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
          <div className="navbar-nav mx-auto">
            <Link to="/userdashboard" className="nav-item nav-link active">Dashboard</Link>
            
            <Link to="/userorders" className="nav-item nav-link">My Orders</Link>
            <Link to="/cart" className="nav-item nav-link">🛒 Cart</Link>
            
          </div>

        
          {/* ✅ REGISTER BUTTON */}
          <button onClick={logout} className="btn btn-outline-secondary">
            Logout
          </button>
          {/* <Link to="/login" className="btn btn-sm btn-primary">
            LOGIN
          </Link> */}
        </div>
      </nav>
    </div>
  );
}

export default UserHeader;