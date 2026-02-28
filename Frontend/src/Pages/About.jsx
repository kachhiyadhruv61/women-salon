import { useState } from "react";


function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container py-5">
      {/* TITLE */}
      <div className="text-center mb-5">
        <h2 className="font-dancing-script text-primary">About Us</h2>
         <h1 className="mb-4">NatureGlow Women Salon</h1>
      </div>

      <div className="row align-items-center">

          {/* LEFT IMAGE SECTION */}
          <div className="col-lg-6">
            <img
              className="img-fluid mb-3 rounded"
              src="/img/about1.png"
              alt="NatureGlow Women Salon"
            />

            <div className="d-flex align-items-center bg-light p-3 rounded">
              <div
                className="btn-square flex-shrink-0 bg-primary d-flex align-items-center justify-content-center"
                style={{ width: "100px", height: "100px" }}
              >
                <i className="fa fa-phone fa-2x text-dark"></i>
              </div>

              <div className="px-3">
                
                <h4 className="mb-0">9998662408</h4>
                <span className="text-muted">
                  Call us 24/7 for free beauty consultation
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT SECTION */}
          <div className="col-lg-6">

            <p className="mb-3">
              NatureGlow Women Salon is a dedicated <strong>women-only organic beauty salon</strong>
              where natural care, comfort and confidence come together.
              We believe true beauty begins with healthy skin, healthy hair
              and chemical-free treatments.
            </p>

            <p>
              Our salon offers a calm, hygienic and secure environment exclusively
              for women, using <strong>100% organic, herbal and live fruit-based products</strong>.
            </p>

            {/* 🔽 READ MORE CONTENT */}
            {showMore && (
              <div className="mt-3">

                <h5 className="text-primary mt-4">🌿 Our Philosophy</h5>
                <p>
                  We focus on enhancing natural beauty without harsh chemicals.
                  All our services are designed to nourish, protect and rejuvenate
                  skin and hair using traditional methods blended with modern techniques.
                </p>

                <h5 className="text-primary mt-4">💆‍♀️ Our Services</h5>
                <ul>
                  <li>Organic Facial & Cleanup</li>
                  <li>Live Fruit Facial & Pedicure</li>
                  <li>Hair Cut, Hair Spa & Hair Treatment</li>
                  <li>Manicure, Pedicure & Fish Spa</li>
                  <li>Waxing & Threading</li>
                  <li>Mehendi & Bridal Mehendi</li>
                  <li>Complete Bridal & Pre-Bridal Packages</li>
                </ul>

                <h5 className="text-primary mt-4">📍 Location-Based Services</h5>
                <p>
                  We provide flexible service locations to suit your comfort:
                </p>
                <ul>
                  <li>🏬 At Our Salon</li>
                  <li>🌿 At Natural Place / Farmhouse</li>
                  <li>🏠 At Home (Selected Services / On Request)</li>
                </ul>

                <h5 className="text-primary mt-4">👩‍💼 Expert Female Staff</h5>
                <p>
                  Our experienced female professionals are trained in organic beauty care
                  and understand individual skin & hair needs. Every service is personalized
                  for best results.
                </p>

                <h5 className="text-primary mt-4">👰 Bridal Special</h5>
                <p>
                  Bridal beauty is our specialty. From pre-bridal preparation
                  to wedding-day perfection, we offer customized organic bridal
                  packages to make every bride glow naturally.
                </p>

                <h5 className="text-primary mt-4">🤍 Our Promise</h5>
                <p>
                  We promise honest service, transparent pricing, hygiene,
                  premium organic products and complete client satisfaction.
                </p>
              </div>
            )}

            {/* STATS */}
            <div className="row g-3 mb-4 mt-4">
              <div className="col-sm-6">
                <div className="bg-light text-center p-4 rounded">
                  <i className="fas fa-calendar-alt fa-3x text-primary mb-2"></i>
                  <h1 className="display-5">10+</h1>
                  <p className="text-dark text-uppercase mb-0">
                    Years Experience
                  </p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="bg-light text-center p-4 rounded">
                  <i className="fas fa-users fa-3x text-primary mb-2"></i>
                  <h1 className="display-5">999+</h1>
                  <p className="text-dark text-uppercase mb-0">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="btn btn-primary text-uppercase px-5 py-3"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>

        </div>
      </div>
    
  );
}

export default About;
