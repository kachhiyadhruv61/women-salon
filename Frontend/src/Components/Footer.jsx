import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container-fluid footer position-relative bg-dark text-white-50 py-5 mt-5 wow fadeIn">
      <div className="container py-5">
        <div className="row g-5">
          {/* Left Side */}
          <div className="col-lg-6 pe-lg-5">
            <Link to="/" className="navbar-brand">
              <h1 className="display-5 text-primary mb-0">
                <i className="bi bi-scissors"></i> A<sup>2</sup>
              </h1>
            </Link>

            <p>
              Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem nonumy.
              Tempor sea ipsum diam sed clita dolore eos dolores magna erat dolore sed
              stet justo et dolor.
            </p>

            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-2"></i>Anand
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-2"></i>9574568855
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-2"></i>9998662408
            </p>
            <p>
              <i className="fa fa-envelope me-2"></i>beenakachhiya@gmail.com
            </p>
            <p>
              <i className="fa fa-envelope me-2"></i>patelaxita75@gmail.com
            </p>

            <div className="d-flex justify-content-start mt-4">
              <a className="btn btn-sm-square btn-primary me-3" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-sm-square btn-primary me-3" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-sm-square btn-primary me-3" href="#"><i className="fab fa-linkedin-in"></i></a>
              <a className="btn btn-sm-square btn-primary me-3" href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 ps-lg-5">
            <div className="row g-4">
              <div className="col-sm-6">
                <h5 className="text-primary mb-4">Quick Links</h5>
                <Link className="btn btn-link" to="/about">About Us</Link>
                <Link className="btn btn-link" to="/contact">Contact Us</Link>
                <Link className="btn btn-link" to="/service">Our Service</Link>
                <Link className="btn btn-link" to="/terms">Terms & Condition</Link>
                
              </div>

              <div className="col-sm-6">
                <h5 className="text-primary mb-4">Popular Links</h5>
                <Link className="btn btn-link" to="/about">About Us</Link>
                <Link className="btn btn-link" to="/contact">Contact Us</Link>
                <Link className="btn btn-link" to="/service">Our Service</Link>
                <Link className="btn btn-link" to="/terms">Terms & Condition</Link>
              </div>

              <div className="col-sm-12">
                <h5 className="text-primary mb-4">Newsletter</h5>
                <div className="position-relative w-100 mb-2">
                  <input
                    className="form-control bg-secondary border-0 w-100 ps-4 pe-5"
                    type="email"
                    placeholder="Enter Your Email"
                    style={{ height: "60px" }}
                  />
                  <button
                    type="button"
                    className="btn shadow-none position-absolute top-0 end-0 mt-2 me-2"
                  >
                    <i className="fa fa-paper-plane text-primary fs-4"></i>
                  </button>
                </div>
                <p className="mb-0">Diam sed sed dolor stet amet eirmod</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;


   

