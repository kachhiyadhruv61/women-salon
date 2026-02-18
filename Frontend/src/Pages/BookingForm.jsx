import { useState } from "react";

function BookingForm({ onBookingSubmit }) {

  // 💰 Service Data
  const servicesData = {
    Facial: {
      price: 1000,
      staff: ["Riya", "Neha"],
      locations: ["At Salon", "At Home"],
    },
    Haircut: {
      price: 500,
      staff: ["Kavita", "Sneha"],
      locations: ["At Salon"],
    },
    "Bridal Package": {
      price: 10000,
      staff: ["Senior Artist - Meera"],
      locations: ["At Salon", "Natural Place"],
    },
  "Gold Facial": {
    price: 1500,
    staff: ["Riya", "Meera"],
    locations: ["At Salon"],
  },

  "Organic Cleanup": {
    price: 800,
    staff: ["Neha", "Sneha"],
    locations: ["At Salon", "At Home"],
  },

  "Live Fruit Facial": {
    price: 1800,
    staff: ["Meera"],
    locations: ["At Salon","At Home","Natural Place"],
  },

  "Hair Spa": {
    price: 2000,
    staff: ["Kavita"],
    locations: ["At Salon"],
  },
  "Basic Bridal Package": {
    price: 7000,
    staff: ["Meera"],
    locations: ["At Salon"],
  },

  "Premium Bridal Package": {
    price: 15000,
    staff: ["Senior Artist - Meera"],
    locations: ["At Salon", "Natural Place"],
  },

  "Luxury Organic Bridal Package": {
    price: 25000,
    staff: ["Senior Artist - Meera"],
    locations: ["At Salon", "Natural Place"],
  },

  "Full Arms Waxing": {
    price: 600,
    staff: ["Neha", "Sneha"],
    locations: ["At Salon", "At Home"],
  },

  "Full Legs Waxing": {
    price: 900,
    staff: ["Neha"],
    locations: ["At Salon", "At Home"],
  },

  "Basic Mehendi": {
    price: 1500,
    staff: ["Pooja"],
    locations: ["At Salon", "At Home"],
  },

  "Bridal Mehendi": {
    price: 8000,
    staff: ["Expert Mehendi Artist - Pooja"],
    locations: ["At Salon", "At Home"],
  },

  "Arabic Mehendi": {
    price: 3000,
    staff: ["Pooja"],
    locations: ["At Salon", "At Home"],
  },

  Threading: {
    price: 100,
    staff: ["Neha", "Sneha"],
    locations: ["At Salon"],
  },

  "Eyebrow Threading": {
    price: 50,
    staff: ["Neha"],
    locations: ["At Salon"],
  },

  "Upper Lip Threading": {
    price: 40,
    staff: ["Sneha"],
    locations: ["At Salon"],
  },

  "Classic Manicure": {
    price: 700,
    staff: ["Riya"],
    locations: ["At Salon"],
  },

  "Spa Pedicure": {
    price: 1200,
    staff: ["Riya"],
    locations: ["At Salon"],
  },

  "Classic Pedicure": {
    price: 800,
    staff: ["Sneha"],
    locations: ["At Salon"],
  },

  "Fish Tank Therapy": {
    price: 1500,
    staff: ["Riya"],
    locations: ["At Salon"],
  },
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    staff: "",
    location: "",
    date: "",
    time: "",
    message: "",
    advance: "",
  });

  const [availableStaff, setAvailableStaff] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // 💰 When service changes
    if (name === "service") {
      const selectedService = servicesData[value];

      if (selectedService) {
        setAvailableStaff(selectedService.staff);
        setAvailableLocations(selectedService.locations);

        const total = selectedService.price;
        const advance = Number(formData.advance) || 0;
        setRemainingAmount(total - advance);
      }
    }

    // 📍 When location changes → set time slots
    if (name === "location") {
      if (value === "At Salon") {
        setAvailableTimeSlots([
          "09:00 AM",
          "11:00 AM",
          "01:00 PM",
          "04:00 PM",
          "07:00 PM",
        ]);
      } else if (value === "At Home") {
        setAvailableTimeSlots([
          "10:00 AM",
          "12:00 PM",
          "02:00 PM",
        ]);
      } else if (value === "Natural Place") {
        setAvailableTimeSlots([
          "07:00 AM",
          "08:00 AM",
          "09:00 AM",
        ]);
      }
    }

    // 💰 When advance changes
    if (name === "advance" && formData.service) {
      const total = servicesData[formData.service]?.price || 0;
      setRemainingAmount(total - Number(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalAmount =
      servicesData[formData.service]?.price || 0;

    if (Number(formData.advance) <= 0) {
    alert("Please pay advance amount to confirm booking");
    return;
  }

  // 🔥 Send data to parent (UserBooking)
  onBookingSubmit({
    ...formData,
    totalAmount,
    remainingAmount,
    status: "Confirmed",
  });

  // 📲 WhatsApp Number Format
  const userPhone = formData.phone.startsWith("91")
    ? formData.phone
    : "91" + formData.phone;

  // 📲 WhatsApp Message
  const whatsappMsg = `Hello ${formData.name} 👋

Your booking is CONFIRMED ✅

Service: ${formData.service}
Staff: ${formData.staff}
Location: ${formData.location}
Date: ${formData.date}
Time: ${formData.time}

Total Amount: ₹${totalAmount}
Advance Paid: ₹${formData.advance}
Remaining Amount: ₹${remainingAmount}

Please pay remaining amount at the time of service 🌸`;

  // 📲 Open WhatsApp
  window.open(
    `https://wa.me/${userPhone}?text=${encodeURIComponent(
      whatsappMsg
    )}`,
    "_blank"
  );

  alert("Booking Confirmed & WhatsApp Message Sent ✅");

  // 🔄 Reset Form
  setFormData({
    name: "",
    phone: "",
    service: "",
    staff: "",
    location: "",
    date: "",
    time: "",
    message: "",
    advance: "",
  });

    setRemainingAmount(0);
    setAvailableStaff([]);
    setAvailableLocations([]);
    setAvailableTimeSlots([]);
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

        {/* Service */}
        <select
          className="form-control mb-2"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          {Object.keys(servicesData).map((service, index) => (
            <option key={index}>{service}</option>
          ))}
        </select>

        {/* Staff */}
        {availableStaff.length > 0 && (
          <select
            className="form-control mb-2"
            name="staff"
            value={formData.staff}
            onChange={handleChange}
            required
          >
            <option value="">Select Staff</option>
            {availableStaff.map((staff, index) => (
              <option key={index}>{staff}</option>
            ))}
          </select>
        )}

        {/* Location */}
        {availableLocations.length > 0 && (
          <select
            className="form-control mb-2"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            {availableLocations.map((loc, index) => (
              <option key={index}>{loc}</option>
            ))}
          </select>
        )}

        {/* Date */}
        <input
          type="date"
          className="form-control mb-2"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Time Slot */}
        {availableTimeSlots.length > 0 && (
          <select
            className="form-control mb-2"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>
            {availableTimeSlots.map((time, index) => (
              <option key={index}>{time}</option>
            ))}
          </select>
        )}

        {/* Advance */}
        <input
          type="number"
          className="form-control mb-2"
          name="advance"
          placeholder="Enter Advance Amount"
          value={formData.advance}
          onChange={handleChange}
          required
        />

        {/* Remaining */}
        {formData.service && (
          <div className="alert alert-info">
            Total: ₹{servicesData[formData.service]?.price} <br />
            Remaining: ₹{remainingAmount}
          </div>
        )}

        <textarea
          className="form-control mb-3"
          name="message"
          placeholder="Any message (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">
          Confirm Booking
        </button>

      </form>
    </div>
  );
}

export default BookingForm;
