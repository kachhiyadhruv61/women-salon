function About() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* Left Image Side */}
          <div className="col-lg-6">
            <img className="img-fluid mb-3" src="/img/about.jpg" alt="About" />

            <div className="d-flex align-items-center bg-light">
              <div
                className="btn-square flex-shrink-0 bg-primary d-flex align-items-center justify-content-center"
                style={{ width: "100px", height: "100px" }}
              >
                <i className="fa fa-phone fa-2x text-dark"></i>
              </div>

              <div className="px-3">
                <h3>9574568855</h3>
                <h3>9998662408</h3>
                <span>Call us direct 24/7 for get a free consultation</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <h1 className="font-dancing-script text-primary">About Us</h1>
            <h1 className="mb-5">Why People Choose Us!</h1>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget libero
              lobortis, auctor nisi quis, aliquet nunc. Nam dapibus interdum lacus.
            </p>

            <div className="row g-3 mb-5">
              <div className="col-sm-6">
                <div className="bg-light text-center p-4">
                  <i className="fas fa-calendar-alt fa-4x text-primary"></i>
                  <h1 className="display-5">25</h1>
                  <p className="text-dark text-uppercase mb-0">Years experience</p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="bg-light text-center p-4">
                  <i className="fas fa-users fa-4x text-primary"></i>
                  <h1 className="display-5">999</h1>
                  <p className="text-dark text-uppercase mb-0">Happy Customers</p>
                </div>
              </div>
            </div>

            <a className="btn btn-primary text-uppercase px-5 py-3" href="#">
              Read More
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
