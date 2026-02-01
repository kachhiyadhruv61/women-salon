import { useState } from "react";
import BookingForm from "../Pages/BookingForm";

function UserBooking() {
  const [bookings, setBookings] = useState([]);

  const addBooking = (data) => {
    setBookings([
      ...bookings,
      {
        id: Date.now(),
        ...data,
        status: "Pending",
      },
    ]);
  };

  return (
    <div className="container py-5">
      <BookingForm onBookingSubmit={addBooking} />

      <h4 className="mt-5">My Bookings 📅</h4>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.service}</td>
              <td>{b.date}</td>
              <td>{b.location}</td>
              <td>
                <span
                  className={`badge ${
                    b.status === "Approved"
                      ? "bg-success"
                      : b.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserBooking;

