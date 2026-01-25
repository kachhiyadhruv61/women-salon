function UserBooking() {
  const bookings = [
    { id: 1, service: "Organic Facial", date: "2026-01-20", status: "Approved" },
    { id: 2, service: "Waxing", date: "2026-01-25", status: "Pending" },
  ];

  return (
    <div>
      <h4>My Bookings 📅</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.service}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserBooking;