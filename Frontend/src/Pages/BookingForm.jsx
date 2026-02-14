import { useState } from "react";

function BookingForm({ onBookingSubmit }) {

  // 💰 Service Price Mapping
  const servicePrices = {
    Facial: 1000,
    Haircut: 500,
    "Bridal Package": 10000,
    Waxing: 800,
    Mehendi: 3000,
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    location: "",
    date: "",
    message: "",
    advance: "",
  });

  const [remainingAmount, setRemainingAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // 💰 Remaining calculation when advance entered
    if (name === "advance" && formData.service) {
      const total = servicePrices[formData.service] || 0;
      setRemainingAmount(total - Number(value));
    }

    // 💰 When service changes
    if (name === "service") {
      const total = servicePrices[value] || 0;
      const advance = Number(formData.advance) || 0;
      setRemainingAmount(total - advance);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalAmount = servicePrices[formData.service] || 0;

    if (Number(formData.advance) <= 0) {
      alert("Please pay advance amount to confirm booking");
      return;
    }

    onBookingSubmit({
      ...formData,
      totalAmount,
      remainingAmount,
      status: "Confirmed",
    });

    // 📲 WhatsApp Number
    const userPhone = formData.phone.startsWith("91")
      ? formData.phone
      : "91" + formData.phone;

    // 📲 WhatsApp Confirmation Message
    const whatsappMsg = `Hello ${formData.name} 👋

Your booking is CONFIRMED ✅

Service: ${formData.service}
Location: ${formData.location}
Date: ${formData.date}

Total Amount: ₹${totalAmount}
Advance Paid: ₹${formData.advance}
Remaining Amount: ₹${remainingAmount}

Please pay remaining amount at the time of service 🌸`;

    window.open(
      `https://wa.me/${userPhone}?text=${encodeURIComponent(whatsappMsg)}`,
      "_blank"
    );

    // Reset Form
    setFormData({
      name: "",
      phone: "",
      service: "",
      location: "",
      date: "",
      message: "",
      advance: "",
    });

    setRemainingAmount(0);
  };

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">Book Your Service 💆‍♀️</h4>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          className="form-control mb-2"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          <option>Facial</option>
          <option>Gold Facial</option>
          <option>Organic Cleanup</option>
          <option>Haircut</option>
          <option>Hair Spa</option>
          <option>Bridal Package</option>
          <option>Basic Bridal Package</option>
          <option>Premium Bridal Package</option>
          <option>Luxury Organic Bridal Package</option>
          <option>Full Arms Waxing</option>
          <option>Full Legs Waxing</option>
          <option>Basic Mehendi</option>
          <option>Bridal Mehendi</option>
          <option>Arabic Mehendi</option>
          <option>Threading</option>
          <option>Eyebrow Threading</option>
          <option>Upper Lip Threading</option>
          <option>Classic Manicure</option>
          <option>Spa Pedicure</option>
          <option>Classic Pedicure</option>
          <option>Fish Tank Therapy</option>

        </select>

        <select
          className="form-control mb-2"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="">Service Location</option>
          <option>At Salon</option>
          <option>Natural Place</option>
          <option>At Home</option>
        </select>

        <input
          type="date"
          className="form-control mb-2"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* 💰 Advance Payment Input */}
        <input
          type="number"
          className="form-control mb-2"
          name="advance"
          placeholder="Enter Advance Amount"
          value={formData.advance}
          onChange={handleChange}
          required
        />

        {/* 💰 Remaining Display */}
        {formData.service && (
          <div className="alert alert-info">
            Total: ₹{servicePrices[formData.service]} <br />
            Remaining: ₹{remainingAmount}
          </div>
        )}

        <textarea
          className="form-control mb-3"
          name="message"
          placeholder="Any message (optional)"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-success w-100">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
