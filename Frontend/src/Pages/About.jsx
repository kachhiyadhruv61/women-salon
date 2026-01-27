import { useState } from "react";

function About() {
  const [showMore, setShowMore] = useState(false);

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
                <span>Call us direct 24/7 for free consultation</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <h1 className="font-dancing-script text-primary">About Us</h1>
            <h1 className="mb-4">Why People Choose Us!</h1>

            <p className="mb-3">
              We provide organic & natural beauty services with expert staff,
              premium products, and a peaceful environment.
            </p>

            {/* 🔽 READ MORE CONTENT */}
            {showMore && (
              <div className="mb-4">
                <p>
                  Our salon focuses on 100% organic treatments including natural
                  facials, herbal waxing, bridal packages, manicure & pedicure.
                  We believe in skin safety, hygiene, and personalized care.
                </p>

                <p>
                  With experienced professionals and a calm natural ambience,
                  we ensure every client feels refreshed, confident, and
                  beautiful.
                </p>
              </div>
            )}

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="bg-light text-center p-4">
                  <i className="fas fa-calendar-alt fa-4x text-primary"></i>
                  <h1 className="display-5">10</h1>
                  <p className="text-dark text-uppercase mb-0">
                    Years Experience
                  </p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="bg-light text-center p-4">
                  <i className="fas fa-users fa-4x text-primary"></i>
                  <h1 className="display-5">999+</h1>
                  <p className="text-dark text-uppercase mb-0">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ BUTTON */}
            <button
              className="btn btn-primary text-uppercase px-5 py-3"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
