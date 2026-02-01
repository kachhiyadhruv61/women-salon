import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Thank you ${formData.name}! 🎉\nYour booking request has been submitted successfully.`
    );

    // Clear form
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      location: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="container py-5">
      <div className="row g-5">

        {/* LEFT SIDE - CONTACT INFO */}
        <div className="col-lg-5">
          <h1 className="text-primary mb-4">Contact Us</h1>

          <p>
            We’re always happy to help you look & feel beautiful 🌿  
            Book your appointment or contact us for free consultation.
          </p>

          <p>📍 <strong>Address:</strong><br />
            A<sup>2</sup> Women Salon,<br />
           Anand, Gujarat
          </p>

          <p>📞 <strong>Phone:</strong><br />
            9574568855<br />
            9998662408
          </p>

          <p>🕒 <strong>Working Hours:</strong><br />
            Mon – Sat: 9:00 AM – 8:00 PM<br />
            Sun: 10:00 AM – 6:00 PM
          </p>

          {/* WHATSAPP BUTTON */}
          <a
            href="https://wa.me/919574568855"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success px-4 py-2 mt-3"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <div className="col-lg-7">
          <div className="bg-light p-4 rounded shadow">
            <h3 className="mb-4 text-center">Book Your Appointment</h3>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email (optional)"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* SERVICE SELECT */}
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service</option>
                    <option>Bridal Package</option>
                    <option>Pre-Bridal Services</option>
                    <option>Organic Fruit Facial</option>
                    <option>Pedicure / Manicure</option>
                    <option>Mehendi</option>
                    <option>Hair Treatment</option>
                  </select>
                </div>

                {/* LOCATION SELECT */}
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Location</option>
                    <option>Salon Location</option>
                    <option>Home Service</option>
                    <option>Wedding Venue</option>
                    <option>Natural Outdoor Location</option>
                  </select>
                </div>

                {/* DATE */}
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* MESSAGE */}
                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Message / Special Requirements"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="col-12 text-center">
                  <button className="btn btn-primary px-5 py-2">
                    Submit Booking
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
