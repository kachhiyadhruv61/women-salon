import { useState } from "react";

function AdBooking() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Aditi",
      service: "Facial",
      date: "2026-01-20",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      )
    );
  };

  return (
    <div className="container py-5">
      <h3>Admin Booking Management 👩‍💼</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.service}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(b.id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(b.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdBooking;
