import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// ==========================
// CONTACT SUBMIT
// ==========================
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // const res = await fetch("http://localhost:5000/contacts", 
    const res = await apiFetch("/contacts",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        action: "Open"
      }),
    });



const data = await res.json();
console.log("STATUS:", res.status);
console.log("RESPONSE:", data);
console.log("ERRORS:", data.errors);
console.log(data.errors.map(err => err.msg));



    if (res.ok && data.success) {

      alert(data.message);

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });

    } else {

      alert("Failed to send message ❌");

    }

  } catch (error) {

    console.error(error);
    alert("Server error ❌");

  }
};

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="font-dancing-script text-primary">Contact Us</h2>
        <h1>Get In Touch</h1>
      </div>

      <div className="row align-items-stretch">

        {/* LEFT SIDE */}
        <div className="col-lg-5 mb-4">
          <div className="p-4 rounded shadow-sm h-100" style={{ backgroundColor: "#f8f9fa" }}>
            
            <p>
              We’re always happy to help you look & feel beautiful 🌿  
              Book your appointment or contact us for free consultation.
            </p>
            
 {/* GOOGLE MAP */}
           {/* GOOGLE MAP */}
<p>
  📍 <strong>Address:</strong><br />

  <a 
    href="https://www.google.com/maps/search/?api=1&query=A2+Women+Salon,+Anand,+Gujarat"
    target="_blank"
    rel="noopener noreferrer"
    style={{ 
      color: "#0d6efd", 
      textDecoration: "underline",
      fontWeight: "500",
      cursor: "pointer"
    }}
  >
    A<sup>2</sup> Women Salon,<br />
    Anand, Gujarat
  </a>
</p>

            <p>📞 <strong>Phone:</strong><br />
              9574568855<br />
              9998662408
            </p>

            <p>🕒 <strong>Working Hours:</strong><br />
              Mon – Sat: 9:00 AM – 8:00 PM<br />
              Sun: 10:00 AM – 6:00 PM
            </p>

            <a
              href="https://wa.me/919574568855"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success px-4 py-2 mt-3"
            >
              💬 Chat on WhatsApp
            </a>


          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-7">
          <div className="bg-light p-4 rounded shadow h-100">
            <h3 className="mb-4 text-center">Send Us a Message</h3>

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

                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary px-5 py-2">
                    Send Message
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