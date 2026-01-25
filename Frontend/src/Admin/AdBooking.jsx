import { useState } from "react";

function AdBooking() {
  const [bookings, setBookings] = useState([]);
  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  // Add Booking
  const addBooking = (e) => {
    e.preventDefault();

    if (!customer || !service || !date) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      id: Date.now(),
      customer,
      service,
      date,
      status: "Pending",
    };

    setBookings([...bookings, newBooking]);
    setCustomer("");
    setService("");
    setDate("");
  };

  // Delete Booking
  const deleteBooking = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Booking Management 📅</h2>

      {/* Booking Form */}
      <form onSubmit={addBooking} className="mb-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="form-control mb-2"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Select Service</option>
          <option>Waxing</option>
          <option>Facial</option>
          <option>Manicure</option>
          <option>Pedicure</option>
          <option>Bridal Package</option>
        </select>

        <input
          type="date"
          className="form-control mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn btn-primary w-100">Add Booking</button>
      </form>

      {/* Booking List */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.customer}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.status}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBooking(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdBooking;
