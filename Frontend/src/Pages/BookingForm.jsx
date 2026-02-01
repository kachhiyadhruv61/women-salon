import { useState } from "react";

function BookingForm({ onBookingSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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

    onBookingSubmit(formData);

  // 📲 User WhatsApp Number (India +91 auto add)
  const userPhone = formData.phone.startsWith("91")
    ? formData.phone
    : "91" + formData.phone;

  // 📲 WhatsApp Message
  const whatsappMsg = `Hello ${formData.name} 👋

Your booking request is received ✅

Service: ${formData.service}
Location: ${formData.location}
Date: ${formData.date}

Our team will contact you soon 🌸`;

  window.open(
    `https://wa.me/${userPhone}?text=${encodeURIComponent(whatsappMsg)}`,
    "_blank"
  );

    setFormData({
      name: "",
      phone: "",
      service: "",
      location: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">Book Your Service 💆‍♀️</h4>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input className="form-control mb-2" name="phone" placeholder="Mobile Number" onChange={handleChange} required />

        <select className="form-control mb-2" name="service" onChange={handleChange} required>
          <option value="">Select Service</option>
          <option>Facial</option>
          <option>Haircut</option>
          <option>Bridal Package</option>
          <option>Waxing</option>
          <option>Mehendi</option>
        </select>

        <select className="form-control mb-2" name="location" onChange={handleChange} required>
          <option value="">Service Location</option>
          <option>At Salon</option>
          <option>Natural Place</option>
          <option>At Home</option>
        </select>

        <input type="date" className="form-control mb-2" name="date" onChange={handleChange} required />

        <textarea className="form-control mb-3" name="message" placeholder="Any message (optional)" onChange={handleChange}></textarea>

        <button className="btn btn-success w-100">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
